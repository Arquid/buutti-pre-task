const persons = Object.freeze([ //Don't edit this array
  {
    userId: 1,
    name: "Teppo Testaaja",
    dateOfBirth: new Date("1959-01-01"),
    email: "teppo.testaaja@buutti.com",
  },
  {
    userId: 2,
    name: "Tessa Testaaja",
    dateOfBirth: new Date("1981-01-01"),
    email: "tessa.testaaja@buutti.com",
  },
  {
    userId: 3,
    name: "Teuvo Testaaja",
    dateOfBirth: new Date("1989-05-05"),
    email: "teuvo.testaaja@buutti.com",
  },
  {
    userId: 4,
    name: "Outi Ohjelmoija",
    dateOfBirth: new Date("1972-06-06"),
    email: "outi.ohjelmoija@buutti.com",
  },
  {
    userId: 5,
    name: "Olli Ohjelmoija",
    dateOfBirth: new Date("1989-05-05"),
    email: "olli.ohjelmoija@buutti.com",
  },
  {
    userId: 6,
    name: "Teppo Ohjelmoija",
    dateOfBirth: new Date("1980-02-02"),
    email: "teppo.ohjelmoija@buutti.com",
  },
]);

const professions = Object.freeze([
  {
    userId: 1,
    workplace: "Some Company",
    position: "Manager",
  },
  {
    userId: 2,
    workplace: "Epic Company",
    position: "System admin",
  },
  {
    userId: 3,
    workplace: "Some Company",
    position: "Developer",
  },
  {
    userId: 4,
    workplace: "Some Company",
    position: "Manager",
  },
  {
    userId: 5,
    workplace: "Epic Company",
    position: "System admin",
  },
  {
    userId: 6,
    workplace: "Epic Company",
    position: "Developer",
  },
]);

const interests = Object.freeze([
  {
    userId: 1,
    interest: "Cats",
  },
  {
    userId: 1,
    interest: "Computers",
  },
  {
    userId: 2,
    interest: "Ice hockey",
  },
  {
    userId: 2,
    interest: "Computers",
  },
  {
    userId: 3,
    interest: "Computers"
  },
  {
    userId: 3,
    interest: "Cats",
  },
  {
    userId: 3,
    interest: "Football",
  },
  {
    userId: 4,
    interest: "Computers",
  },
  {
    userId: 4,
    interest: "Epicness",
  },
  {
    userId: 5,
    interest: "Computers",
  },
  {
    userId: 6,
    interest: "Fishing",
  },
  {
    userId: 6,
    interest: "Cats",
  },
]);

/* It's enough to make this function work with the
 'persons' array above. You don't have to consider or defend
  against any other type of names. */
const findByFirstName = (firstname) => {

  // find persons by firstname from persons array.
  const personList = persons.filter((person) =>
    person.name.includes(firstname)
  );

  // return names in array
  return personList;
};

/* Should return the users age.
 Age should be an integer.
  findPersonAge("Teuvo Testaaja") returns 31
  */
const findPersonAge = (name) => {

  // find person by name from persons array
  const person = persons.filter((person) => person.name.includes(name));

  // get person dateOfBirth and date today
  const birthDate = person[0].dateOfBirth;
  const dateNow = new Date();

  // calculate person age
  let personAge = dateNow.getFullYear() - birthDate.getFullYear();

  // check month and day. 
  if (
    dateNow.getMonth() < birthDate.getMonth() ||
    (dateNow.getMonth() === birthDate.getMonth() &&
      dateNow.getDate() < birthDate.getDate())
  ) {
    personAge += 1;
  }

  // return age
  return personAge;
};

/*
Calculate the average age of all users in the persons array (fullyears)
*/
const calculateAverageAge = () => {

  // get all ages with findPersonAge function
  const personAges = persons.map((person) => findPersonAge(person.name));
  
  // calculate average age
  const averageAge =
    personAges.reduce((acc, cur) => acc + cur) / persons.length;

  // return rounded average age  
  return Math.round(averageAge);
};

/*Turn the arrays of objects (persons, professions, interests) into a
new object of workplace profiles with employees of the
particular company listed as shown below.
Also include the interests of that particular
employee as a new array in the employeeObject.
Below is an example of how Some Company
profile object should look like:
{
    'Some Company': {
        employees: [
            {
                userId: 1,
                name: "Teppo Testaaja",
                dateOfBirth: 1959-01-01T00:00:00.000Z,
                email: "teppo.testaaja@buutti.com",
                position: "Manager",
                interests: ["Computers", "Cats"]
            },
            {            
                userId: 3,
                name: "Teuvo Testaaja",
                dateOfBirth: 1989-05-05T00:00:00.000Z,
                email: "teuvo.testaaja@buutti.com",
                position: "Developer",
                interests: ["Computers", "Cats", "Football"]
            },
            {
                userId: 4,
                name: "Outi Ohjelmoija",
                dateOfBirth: 1972-06-06T00:00:00.000Z,
                email: "outi.ohjelmoija@buutti.com",
                position: "Manager",
                interests: ["Computers", "Epicness"]
            }
        ]
    },
    ...
}
*/
const createCompanyProfiles = () => {

  // get company names from professions array and remove duplicates
  const companyNames = [
    ...new Set(professions.map((company) => company.workplace)),
  ];

  // create object
  let companyObj = {};

  // loop companies
  for(let i=0; i<companyNames.length; i++) {

    // get company name
    const companyName = companyNames[i];

    // get workers and worker ids
    const workers = professions.filter(work => work.workplace === companyName);
    const companyWorkersId = workers.map(id => id.userId);

    // create new array
    const workerInfoArray = [];

    // loop workers
    for(let j=0; j<workers.length; j++) {

      // get data from persons, position and interests
      const person = persons.filter(person => person.userId === companyWorkersId[j]);
      const position = professions.filter(person => person.userId === companyWorkersId[j]);
      const interestArr = interests.filter(person => person.userId === companyWorkersId[j]);
      
      // create temporary object
      const dummyObj = {
        userId: person[0].userId,
        name: person[0].name,
        dateOfBirth: person[0].dateOfBirth,
        email: person[0].email,
        position: position[0].position,
        interests: interestArr.map(inter => inter.interest)
      }

      // add temporary object to worker info array
      workerInfoArray.push(dummyObj);
    }
    
    // add worker info array to company object
    companyObj[`${companyName}`] = {employees: workerInfoArray};
  }

  // return company object
  return JSON.stringify(companyObj);
};

const createCompanyProfilesWithReduce = () => {
  
  // createCompanyProfile function with reduce()
  return professions.reduce((acc, cur) => {
       
    const employObj = 
    professions
      .filter(x => x.workplace === cur.workplace)
      .map(z => {
        const person = persons.filter(p => p.userId === z.userId)
        const posi = professions.filter(i => i.userId === z.userId).map(i => i.position)
        const int = interests.filter(i => i.userId === z.userId).map(i => i.interest)

        const obj = {
          userId: person[0].userId,
          name: person[0].name,
          dateOfBirth: person[0].dateOfBirth,
          email: person[0].email,
          position: posi.toString(),
          interest: int
      }
      return obj
    })

    acc[cur.workplace] = {employees: employObj}

    return acc
  }, {});
}


console.log(
  'All persons with first name "Teppo" are',
  findByFirstName("Teppo")
);

console.log(
  "Calculate Person Teuvo Testaaja age",
  findPersonAge("Teuvo Testaaja")
);

console.log("The average age of all persons", calculateAverageAge());

console.log("Company profiles created", createCompanyProfiles());

console.log("Company profiles created", JSON.stringify(createCompanyProfilesWithReduce()));