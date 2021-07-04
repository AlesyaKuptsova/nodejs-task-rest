import { Delete, Param, Post, Put , Body , Controller, Get, NotFoundException, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";


import { BoardsService } from "./boards.service";
import { BoardDto } from "./dto/board.dto";
import { CreateBoardDto } from "./dto/create-board.dto";

@Controller('boards')
@UseGuards(AuthGuard)
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @Get()
    async findAll(): Promise<BoardDto[]> {
        return this.boardsService.getAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<BoardDto>{
        const board = await this.boardsService.getBoardById(id);
        if(board) {
            return board;
        }
        throw new NotFoundException();
  }

  @Post()
  async create(@Body() createBoardDto: CreateBoardDto): Promise<BoardDto> {
      return this.boardsService.createBoard(createBoardDto);
}

  @Put(':id')
  async update(
      @Param('id') id: string,
      @Body() createBoardDto: CreateBoardDto): Promise<BoardDto> {
    const board = await this.boardsService.updateBoard(id, createBoardDto);
    if (board) {
        return board;
    }
    throw new NotFoundException();
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
      const removed = await this.boardsService.deleteBoard(id);
      if (!removed) {
      throw new NotFoundException();
      }
  }
}
