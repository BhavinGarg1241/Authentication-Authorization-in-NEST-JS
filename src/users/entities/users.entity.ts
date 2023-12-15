import { Entity,PrimaryGeneratedColumn,Column, OneToOne, JoinColumn } from "typeorm";

@Entity('users')
export class UsersEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @Column({default:true})
    status:boolean;
}