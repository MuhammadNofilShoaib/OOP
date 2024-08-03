#! /usr/bin/ env node
import inquirer from "inquirer";  
import chalk from "chalk";

class student {
    name: string;
    constructor(name:string){
        this.name = name;
    }
}

class Person {
    students: student[] = [];

    addStudent(obj: student){
        this.students.push(obj);
    }
}

let persons = new Person();
 
const programStart = async (persons: Person) => { 
    do {
    console.log(chalk.bold.magenta("\nWelcome!"));
    let ans = await inquirer.prompt([  
        {
            name: "select",
            type: "list",
            message: chalk.yellow("\nWho would you like to interact with? "),
            choices: ["Staff", "Student", "Exit"]
        }
    ])
    if(ans.select == "Staff"){
        console.log(chalk.green("\nYou have approached the staff room. Feel free to ask any question."));
        
    }
    else if(ans.select == "Student"){
        const ans = await inquirer.prompt([
            {
                name: "newStudent", 
                type: "input",
                message: chalk.cyan("\nEnter the student name you wish to engage with:")
            }
        ])
        let findStudent = persons.students.find(value => value.name == ans.newStudent);

        if(!findStudent){
            let myName = new student(ans.newStudent)
            persons.addStudent(myName)
            console.log(chalk.blueBright(`\nHello myself ${myName.name}, nice to meet you!`));
            console.log(chalk.magenta("New student added"));
            console.log(chalk.yellow("\n Current student list:"));
            console.log(persons.students);
            
        } 
        else{
            console.log(chalk.blue(`\nHello myself ${findStudent.name}, nicw to see you again!`));
            console.log("\nExisting student list:");
            console.log(persons.students);   
        }
    } else if(ans.select == "Exit"){
        console.log(chalk.red("\nExiting the program..."));
        process.exit(); 
    }
 } while(true); 

}
programStart(persons); 