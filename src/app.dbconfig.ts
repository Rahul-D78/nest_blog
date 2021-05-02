import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
export function createTypeOrmProdConfig(): TypeOrmModuleOptions {
    return({
        type: 'postgres',
        username : 'nest',
        password : 'nest',
        database : 'nest',
        synchronize : true,
        logging: true,
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        logger: 'advanced-console'
    })
}

export function createTypeOrmTestConfig(): TypeOrmModuleOptions {
    return({
        type: 'sqlite',
        database : ':memory:',
        synchronize : true,
        logging: true,
        entities: ['src/entities/*.entity.ts'],
        dropSchema: true
    })
}