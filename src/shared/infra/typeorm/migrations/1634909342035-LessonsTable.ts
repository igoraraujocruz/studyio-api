import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export default class LessonsTable1634909342035 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'lessons',
            columns: [
              {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()',
              },
              {
                name: 'name',
                type: 'varchar',
              },
              {
                name: 'description',
                type: 'varchar',
                isNullable: true,
              },
              {
                name: 'moduleId',
                type: 'uuid',
              },
              {
                name: 'date',
                type: 'timestamp with time zone',
              },
              {
                name: 'createdAt',
                type: 'timestamp',
                default: 'now()',
              },
              {
                name: 'updatedAt',
                type: 'timestamp',
                default: 'now()',
              },
              {
                name: 'deletedAt',
                type: 'timestamp',
                isNullable: true,
              },
            ],
          }),
        );
        await queryRunner.createForeignKey(
          'lessons',
          new TableForeignKey({
            columnNames: ['moduleId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'modules',
            name: 'FkLessonsModules',
            onDelete: 'CASCADE',
            onUpdate: 'SET NULL',
          }),
        );
      }

      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('lessons', 'FkLessonsModules');
        await queryRunner.dropTable('lessons');
      }

}
