import { Entity, Column, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from '../../users/entities/users.entity';

@Entity('user_roles')
export class userRolesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: string;

    @Column({ default: '2' })
    roleId: number;

    @OneToOne(() => UsersEntity)
    @JoinColumn({ name: 'id' })
    user: UsersEntity;
}