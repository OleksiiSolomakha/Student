//Task 1
function Student(firstName, lastName, dateOfBirth, marks) {
  this.counter = 0;
  this.firstName = firstName;
  this.lastName = lastName;
  this.dateOfBirth = dateOfBirth;
  this.marks = marks;
  this.scedule = new Array(25);
}

Student.prototype.getAge = function() {
  return `${this.firstName}у ${new Date().getFullYear() - new Date(this.dateOfBirth).getFullYear()} лет`;
}
Student.prototype.present = function() {
  if(this.counter < 25){
    this.scedule[this.counter] = true; 
    this.counter++;
    return this.scedule;
  }
}
Student.prototype.absent = function() {
  if(this.counter < 25){
    this.scedule[this.counter] = false; 
    this.counter++;
    return this.scedule;
  }
}
Student.prototype.summary = function() {
  let mark = this.marks.reduce((acc, curr) => acc + curr) / this.marks.length;
  let visit = this.scedule.filter(el => el === true).length / this.counter;
  if (mark > 90 && visit > 0.9) {
    return "Ути какой молодчинка!";
  } else if (mark > 90 || visit > 0.9) {
    return "Норм, но можно лучше";
  } else {
    return "Редиска!";
  }
}

const ivanov = new Student('Иван', 'Иванов', '01.01.1990', [85, 100, 90, 95]);
const petrov = new Student('Пётр', 'Петров', '05.05.1995', [62, 56, 73]);
const semenov = new Student('Семён', 'Семёнов', '07.07.1997', [82, 88, 100, 82, 90, 82]);

//Task 2
function Group (...args){
  return this.args = args;
}
Group.prototype = Array;
Array.prototype.attendance = function(student) {
  let groupScedule = [];
  for(let i = 0; i < this.length; i++){
    if (student === this[i].lastName){
      console.log(groupScedule[i] = this[i].scedule);
      // return this[i].scedule;
      return `${this[i].lastName} ${i + 1}й в рейтинге посещяемости`
    }
    groupScedule[i] = this[i].scedule;
  }
  let result = groupScedule.map(el => el[0]).filter(el => el === true).length;
  return `Средняя посещяемость группы ${Math.floor(result)} человек`;
}
Array.prototype.performance = function(student) {
  let groupMarks = [];
  for(let i = 0; i < this.length; i++){
    if (student === this[i].lastName){
      return this[i].marks;
    }
    groupMarks[i] = this[i].marks;
  }
  let result = Math.floor(groupMarks
    .map(el => el.reduce((acc, curr) => acc + curr) / el.length)
    .reduce((acc, curr) => acc + curr) / groupMarks.length);
  return `Средняя оценка в группе ${result} балл(ов)`;
}

let groupA = new Group(ivanov, petrov, semenov);