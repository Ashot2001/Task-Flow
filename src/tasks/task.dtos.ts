import {
	IsString,
	IsDate,
	IsEnum,
	IsOptional,
	Length,
	ValidateNested,
	IsNumber,
	Min,
	IsDateString,
} from 'class-validator';
import { Priority, Status } from '@prisma/client';
import { Transform, Type } from 'class-transformer';

export class TaskDTO {
	@IsString()
	@Length(1, 100)
	title: string;

	@IsString()
	@Length(1, 255)
	description: string;

	@Type(() => Date)
	@IsDate()
	dueDate: Date;

	@IsEnum(Priority)
	priority: Priority;

	@IsString()
	assignedMember: string;

	@IsOptional()
	@IsEnum(Status)
	status?: Status;
}

export class TaskIdDTO {
	@Transform(({ value }) => Number(value), { toClassOnly: true })
	@IsNumber({}, { message: 'id must be a number' })
	@Min(1, { message: 'id must not be less than 1' })
	id: number;
}

export class UpdateTaskDTO {
	@ValidateNested()
	@Type(() => TaskIdDTO)
	taskId: TaskIdDTO;

	@ValidateNested()
	@Type(() => TaskDTO)
	taskParams: TaskDTO;
}

export class TaskStatisticsDTO {
	@IsDateString({}, { message: 'startDate must be a valid ISO 8601 date string' })
	startDate: string;

	@IsDateString({}, { message: 'endDate must be a valid ISO 8601 date string' })
	endDate: string;
}

export class CompletedTaskDto {
	@IsString()
	assignedMember: string;
}
