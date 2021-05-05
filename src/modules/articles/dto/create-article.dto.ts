import { IsNotEmpty } from "class-validator"

export class articleData {
    @IsNotEmpty()
    readonly title: string

    @IsNotEmpty()
    readonly description: string

    @IsNotEmpty()
    readonly body: string
}