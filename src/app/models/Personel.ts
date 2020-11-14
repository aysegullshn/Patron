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

    public static async guncelle(_id: number, _name: String){
        await fetch('http://localhost:59466/api/Personel/Update/'+_id+'/'+_name)
            .then(res => {
            if(res.ok){
             console.log('yenilendi');
            }
        })
    }

    public static async ekle(_name: String, _surname: String){
        await fetch('http://localhost:59466/api/Personel/Add/'+_name+'/'+_surname)
            .then(res => {
              if(res.ok){
                console.log('eklendi');
              }
            })
    }

    public static async sil(id: number){
        await fetch('http://localhost:59466/api/Personel/Delete/'+id)
            .then(res => {
            if(res.ok){
                window.location.reload();
            }
            });
    }
}

export default Personel;