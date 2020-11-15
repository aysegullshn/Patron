class Personel {
    id: number;
    name: String;
    surname: String;
    gender: String;
    salary: String;
    constructor(_name?: String, _surname?: String, _gender?: String, _salary?: String,_id?: number){
        this.id = _id;
        this.name = _name;
        this.surname = _surname;
        this.gender = _gender;
        this.salary = _salary;
    }
}

export default Personel;