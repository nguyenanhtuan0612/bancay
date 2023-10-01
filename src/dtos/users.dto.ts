import { User } from '@/entities/users.entity';
import { JwtInfo } from '@/interfaces/auth.interface';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
    @ApiProperty()
    @IsEmail()
    public email: string;

    @ApiProperty()
    @IsString()
    public password: string;
}

export class CreateUserDto {
    @ApiProperty()
    @IsEmail()
    public email: string;

    @ApiProperty()
    @IsString()
    public password: string;

    @ApiProperty()
    @IsString()
    role: string;
}

export class UpdateUserDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsEmail()
    public email: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public password: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    role: string;
}

export class LoginDto {
    @ApiProperty()
    @IsEmail()
    public email: string;

    @ApiProperty()
    @IsString()
    password: string;
}

export class ChangePasswordDto {
    @ApiProperty()
    @IsString()
    currentPassword: string;

    @ApiProperty()
    @IsString()
    newPassword: string;
}

export class ChangeRoleDto {
    @ApiProperty()
    @IsString()
    role: string;
}

export class AddMoneyToBalanceDto {
    @ApiProperty()
    @IsNumber()
    money: number;
}

export class UserResponse {
    id: string;
    email: string;
    balance: number;
    role: string;
    active: boolean;

    constructor(iUser: User) {
        this.id = iUser.id;
        this.email = iUser.email;
        this.role = iUser.role;
        this.active = iUser.active;
    }
}

export class UserResponeWithToken extends UserResponse {
    jwt: JwtInfo;

    constructor(iUser: User, jwt: JwtInfo) {
        super(iUser);
        this.jwt = jwt;
    }
}
