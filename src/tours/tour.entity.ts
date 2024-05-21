import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tour {
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column()
    title: string
    
    @Column()
    city: string

    @Column()
    location: string
    
    @Column()
    price: number
    
    @Column()
    persons: number

    @Column()
    duration: number

    @Column()
    img: string
}