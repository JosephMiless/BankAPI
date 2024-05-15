import { excuteQuery } from "../config/database.js";

export const createUserTable = async () => {
    try {
        const query = `CREATE TABLE IF NOT EXISTS Users(
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;

        await excuteQuery(query, []);
        console.log('User table created successfully');
    } catch (error) {
        console.log('Error creating user table', error);
    }
}

export const alterUserTable = async () => {
    try {
        const query = `ALTER TABLE Users
        ADD Firstname VARCHAR(255) NOT NULL,
        ADD Lastname VARCHAR(255),
        ADD CONSTRAINT UQ_email UNIQUE(email)
        `;


        // const query = `
        //     IF NOT EXISTS ( SELECT NULL
        //         FROM INFORMATION_SCHEMA.COLUMNS
        //         WHERE table_name = 'users'
        //         AND table_schema = 'bankapi'
        //         AND column_name = 'Firstname'
        //     ) THEN ALTER TABLE users
        //     ADD Firstname VARCHAR(255) NOT NULL,
        //     ADD Lastname VARCHAR(255) NOT NULL,
        //     ADD CONSTRAINT UQ_email UNIQUE(email)
        //     ;
        //     END IF`;


//         const query = `
//         DELIMITER $$
// CREATE PROCEDURE Alter_Table()
// BEGIN
//     DECLARE _count INT;
//     SET _count = (  SELECT COUNT(*) 
//                     FROM INFORMATION_SCHEMA.COLUMNS
//                     WHERE   TABLE_NAME = 'users' AND 
//                             COLUMN_NAME = 'Firstname');
//     IF _count = 0 THEN
//         ALTER TABLE users ADD COLUMN Firstname TINYINT(1) NOT NULL DEFAULT 1
//     END IF;
// END $$
// DELIMITER ; 
//         `

        await excuteQuery(query, []);
        console.log('User table altered successfully');
    } catch (error) {
        console.log('Error Altering users table', error);
    }
}