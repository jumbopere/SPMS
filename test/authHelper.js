import { faker } from "@faker-js/faker";

export const fakerUser = {
  user: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: "jumboper9@spms.com",
    password: "WHYsoSeRious1$%",
    phone: faker.phone.number("+23491########"),
    dob: "1999/07/24",
    nin: "9892939302",
    gender: faker.name.gender(),
    age: 18,
  },
  User: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
    phone: faker.phone.number("+23491########"),
    dob: "1992/08/23",
    nin: "9892939302",
    gender: faker.name.gender(),
    age: 18,
  },

  user1: {
    firstName: "pere",
    lastName: "jumbo",
    email: "jumboperebara00@spms.com",
    password: "WHYsoSeRious1$%",
    phone: faker.phone.number("+23491########"),
    dob: "2002/03/04",
    nin: '9892939302',
    gender: "male",
    age: 21,
 
  },
  user2: {
    firstName: "pere",
    lastName: "jumbo",
    email: "jumboperebara0@spms.com",
    password: "WHYsoSeRious1$%",
    phone: "0903227656",
    dob: "2002/03/04",
    nin: "9892939302",
    gender: "male",
    age: 21,
  },
  user3: {
    firstName: "pere",
    lastName: "jumbo",
    email: "jumbopere9@spms.com",
    password: "12345678",
    phone: "09032276546",
    dob: "2002/03/04",
    nin: "9892939302",
    gender: "male",
    age: 21,
   
  },

  wrongUser: {
    firstName: undefined,
    lastName: faker.name.lastName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(8),
    phone: faker.phone.number("+23491########"),
    dob: "2009/09/09",
    nin: "9892939302",
    gender: faker.name.gender(),
    age: 21,
  },
  wrongUser1: {
    firstName: faker.name.firstName(),
    lastName: undefined,
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
    phone: faker.phone.number("+23491########"),
    dob: "2009/09/09",
    nin:"9892939302",
    gender: faker.name.gender(),
    age: 21,
  },
  wrongUser2: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: undefined,
    password: faker.internet.password(),
    phone: faker.phone.number("+23491########"),
    dob: "2009/09/09",
    nin: "9892939302",
    gender: faker.name.gender(),
    age: 21,
  },
  wrongUser3: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email().toLowerCase(),
    password: undefined,
    phone: faker.phone.number("+23491########"),
    dob: "2009/09/09",
    nin: "9892939302",
    gender: faker.name.gender(),
    age: 21,
  },
  wrongUser4: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
    phone: undefined,
    dob: "2009/09/09",
    nin: "9892939302",
    gender: faker.name.gender(),
    age: 21,
  },
  wrongUser5: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
    phone: faker.phone.number("+234 91 ### ## ##"),
    dob: undefined,

    nin: undefined,
    gender: undefined,
  },

  wrongUser6: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email().toUpperCase(),
    password: faker.internet.password(),
    phone: faker.phone.number("+23491########"),
    dob: "2007/09/12",
    nin: "9892939302",
    gender: faker.name.gender(),
    age: 21,
  },
};


export const fleetOfShips = {
  newShip: {
   name: 'Mighty Ship',
    imo: 1234567,
    type: 'Cargo',
    yearBuilt: 2000,
    dwt: 5000,
    lengthOverall: 100,
    beam: 20,
    speed: 15,
    sensors: ['609c5b5d7a72f602a8f65c45', '609c5b5d7a72f602a8f65c46'],
    userId: '641b4e7829c2005eb64b83cd'
  },
 ship1: {
    name: "Ship 1",
    imo: 12345678,
    type: "Bulk Carrier",
    yearBuilt: 2010,
    dwt: 50000,
    lengthOverall: 229,
    beam: 32.26,
    speed: 14,
    sensors: ['609c5b5d7a72f602a8f65c45', '609c5b5d7a72f602a8f65c46'],
    userId: '641b4e7829c2005eb64b83cc'
  },
 ship2: {
    name: "Ship 2",
    imo: 2345678,
    type: "Tanker",
    yearBuilt: 2012,
    dwt: 65000,
    lengthOverall: 249,
    beam: 44,
    speed: 16,
    sensors: ['609c5b5d7a72f602a8f65c45', '609c5b5d7a72f602a8f65c46'],
    userId: '641b4e7829c2005eb64b83cc'
  },
  ship3:{
    name: "Ship 3",
    imo: 3456789,
    type: "Container Ship",
    yearBuilt: 2015,
    dwt: 80000,
    lengthOverall: 289,
    beam: 40,
    speed: 20,
    sensors: ['609c5b5d7a72f602a8f65c45', '609c5b5d7a72f602a8f65c46'],
    userId: '641b4e7829c2005eb64b83cc'
  },
  ship4: {
    name: 'SS Example',
    imo: 123456,
    type: 'Cargo',
    yearBuilt: 2020,
    dwt: 10000,
    lengthOverall: 150,
    beam: 25,
    speed: 20,
    userId: '641b4e7829c2005eb64b83cc',
    sensors: ['609c5b5d7a72f602a8f65c45', '609c5b5d7a72f602a8f65c46'],
}
};

export const testPerformanceData = [
  {
    speed: 30,
    rpm: 5000,
    fuelConsumption: 10,
    ship: "641e1229a0ab59d923ff6c53",
    temperature: 25,
    position: "12.34,56.78",
  },
  {
    speed: 40,
    rpm: 6000,
    fuelConsumption: 15,
    ship: "641e1229a0ab59d923ff6c53",
    temperature: 30,
    position: "23.45,67.89",
  },
  {
    speed: 50,
    rpm: 7000,
    fuelConsumption: 20,
    ship: "641e1229a0ab59d923ff6c53",
    temperature: 35,
    position: "34.56,78.90",
  },
];
export const sensorArray = [
  {
    name: "Temperature Sensor",
    type: "Thermocouple",
    location: "Engine Room",
    calibration: 10,
    ship: "61574a156a5b5f76cb5e5af5"
  },
  {
    name: "Fuel Sensor",
    type: "Ultrasonic",
    location: "Fuel Tank",
    calibration: 8.5,
    ship: "61574a156a5b5f76cb5e5af5"
  },
  {
    name: "Radar Sensor",
    type: "Pulse",
    location: "Bridge",
    calibration: 15,
    ship: "61574a156a5b5f76cb5e5af5"
  }
]





