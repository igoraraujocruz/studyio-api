import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Generated,
} from 'typeorm';

@Entity('usersTokens')
export class UserToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Generated('uuid')
    token: string;

    @Column()
    userId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
