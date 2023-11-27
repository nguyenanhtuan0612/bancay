import { User } from '@/entities/users.entity';
import { JwtInfo } from '@/interfaces/auth.interface';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

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

    @ApiProperty()
    @IsString()
    fullName: string;

    @ApiProperty()
    @IsString()
    phoneNumber: string;

    @IsString()
    address: string;

    @IsString()
    hsl: string;
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

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    fullName: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    phoneNumber: string;

    @IsString()
    address: string;

    @IsString()
    hsl: string;
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

export class UserResponse {
    id: string;
    email: string;
    role: string;
    active: boolean;
    fullName: string;
    phoneNumber: string;
    address: string;
    hsl: string;

    constructor(iUser: User) {
        this.id = iUser.id;
        this.email = iUser.email;
        this.role = iUser.role;
        this.active = iUser.active;
        this.fullName = iUser.fullName;
        this.phoneNumber = iUser.phoneNumber;
        this.address = iUser.address;
        this.hsl = iUser.hsl;
    }
}

export class UserResponeWithToken extends UserResponse {
    jwt: JwtInfo;

    constructor(iUser: User, jwt: JwtInfo) {
        super(iUser);
        this.jwt = jwt;
    }
}
