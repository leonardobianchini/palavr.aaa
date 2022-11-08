import { Injectable } from "@nestjs/common";
import { Word } from "./word.model";

@Injectable()
export class WordsService {
  words: Word[] = [
    new Word("meias", 'objeto'),
    new Word("bolsa", 'objeto'),
    new Word("prato", 'objeto'),
    new Word("casar", 'verbo'),
  ];

  getAll(): Word[] {
    return this.words;
  }

  findOne(): Word {
    return this.words[0];
  }

  insert(word:Word) {
    this.words.push(word);
  }

  change(word:Word):Word{
    return word;
  }

  delete(){
    this.words.pop();
  }
}