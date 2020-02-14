//Task 1
class Student {
  #counter = 0;
  constructor (firstName, lastName, dateOfBirth, marks){
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.marks = marks;
    this.scedule = new Array(25);
  }
  getAge(){
    return `${this.firstName}у ${new Date().getFullYear() - new Date(this.dateOfBirth).getFullYear()} лет`;
  }
  present(){
    if(this.#counter < 25){
      this.scedule[this.#counter] = true; 
      this.#counter++;
      return this.scedule;
    }
  }
  absent(){
    if(this.#counter < 25){
      this.scedule[this.#counter] = false; 
      this.#counter++;
      return this.scedule;
    }
  }
  summary(){
    let mark = this.marks.reduce((acc, curr) => acc + curr) / this.marks.length;
    let visit = this.scedule.filter(el => el === true).length / this.counter;
    if(mark > 90 && visit > 0.9){
      return "Ути какой молодчинка!";
    } else if (mark > 90 || visit > 0.9){
      return "Норм, но можно лучше";
    } else {
      return "Редиска!";
    }
  }
}

const ivanov = new Student('Иван', 'Иванов', '01.01.1990', [85, 100, 90, 95]);
const petrov = new Student('Пётр', 'Петров', '05.05.1995', [62, 56, 73]);
const semenov = new Student('Семён', 'Семёнов', '07.07.1997', [82, 88, 100, 82, 90, 82]);

//Task 2
class Group extends Array {
  attendance(student){
    let groupScedule = [];
    for(let i = 0; i < this.length; i++){
      groupScedule.push(this[i].scedule);    
    }
    for(let i = 0; i < this.length; i++){
    if (student === this[i].lastName){
        let rate = groupScedule.map(el => el.filter(el => el === true).length).sort().reverse();
        let person = groupScedule[i].filter(el => el === true).length;
        return `${this[i].lastName} ${rate.indexOf(person) + 1}й в рейтинге посещяемости`
      }
    }
    let lessons = groupScedule
        .map(el => el.filter(el => el === true || el === false).length)
        .reduce((acc, curr) => acc + curr);
    let visited = groupScedule
        .map(el => el.filter(el => el === true).length)
        .reduce((acc, curr) => acc + curr);;
    let middle = visited / lessons;
    return `Средняя посещяемость группы ${Math.floor(middle * 100)}%`;
  }
  performance(student){
    let groupMarks = [];
    for(let i = 0; i < this.length; i++){
      groupMarks.push(this[i].marks);    
    }
    for(let i = 0; i < this.length; i++){
      if (student === this[i].lastName){
        let rate = groupMarks.map(el => el.reduce((acc, curr) => acc + curr)).sort().reverse();
        let person = groupMarks[i].reduce((acc, curr) => acc + curr);
        return `${this[i].lastName} ${rate.indexOf(person) + 1}й в рейтинге оценок`
      }
    }
    let result = Math.floor(groupMarks
      .map(el => el.reduce((acc, curr) => acc + curr) / el.length)
      .reduce((acc, curr) => acc + curr) / groupMarks.length);
    return `Средняя оценка в группе ${result} балл(ов)`;
  }
}

let groupA = new Group(ivanov, petrov, semenov);