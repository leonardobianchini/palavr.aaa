import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Word } from './word.model';
import { WordsService } from "./words.service";

@Controller('words')
export class WordsController {

  constructor(private wordsService:WordsService){}

  @Get()
  public getWords(): Word[] {
    return this.wordsService.getAll();
  }

  @Get(':id')
  public getWordById(@Param() wordId): Word {
    return this.wordsService.findOne();
  }

  @Post()
  createWord(@Body() word){
    this.wordsService.insert(word);
  }

  @Put()
  changeWord(@Body() word):Word{
    return this.wordsService.change(word);
  }

  @Delete(':id')
  public deleteWord(@Param() wordId): string {
    this.wordsService.delete();
    return `WordID ${wordId.id} deleted`;
  }
}