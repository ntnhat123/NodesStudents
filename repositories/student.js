import Exception from '../exceptions/Exceptions.js'
import {StudentModel} from '../models/index.js'
import jwt from "jsonwebtoken"
import HttpStatus from '../exceptions/HttpStatus.js'
import {faker} from '@faker-js/faker'
const getAllStudents = async({
    page,
    size,
    searchString,
}) => {
    page = page ? parseInt(page) : 1
    size = size ? parseInt(size) : 10 
    let filterStudents = await  StudentModel.aggregate([
        {
            $match:{
                $or:[
                    {name:{$regex: `.*${searchString}.*`,$options:'i'}},
                    {email:{$regex: `.*${searchString}.*`,$options:'i'}},
                    {address:{$regex: `.*${searchString}.*`,$options:'i'}},
                ]
            }

        },
        {
            $skip : (page - 1) * size
        },
        {
            $limit : size
        },
    ])
    return filterStudents
}

const insertStudent = async({
    name,
    email,
    gender,
    phoneNumber,
    language,
    address
}) => {
    try{
        const student = await StudentModel.create({
            id,
            name,
            email,
            gender,
            phoneNumber,
            language,
            address
        })
        student.save()

    }catch(exceptions){
        if(exceptions.errors ){
            throw new Exception(Exception.VALIDATION_ERROR,exceptions.errors)
        }
    }

}

const updateStudent = async({
    name,
    email,
    gender,
    phoneNumber,
    language,
    address
}) => {
    const student = await StudentModel.findById(id)
    if(!student){
        throw new Exception(Exception.VALIDATION_ERROR,{
            message:"Student not found"
        })
    }
    student.name = name ?? student.name
    student.email = email ?? student.email
    student.gender = gender ?? student.gender
    student.phoneNumber = phoneNumber ?? student.phoneNumber
    student.language = language ?? student.language
    student.address = address ?? student.address


}

async function genFakerStudent(){
    let fakestudents = []
    for(let i = 0; i < 10; i++){

            let fakeStudent = {
                name:faker.person.fullName(),
                email:faker.internet.email(),
                language:[
                    faker.helpers.arrayElement(['English','Vietnamese','Japanese']),
                    faker.helpers.arrayElement(['Korean','Japanese','Campuchia']),
                ],
                gender:faker.helpers.arrayElement(['Male','Female']),
                phoneNumber:faker.phone.number(),
                address:faker.location.streetAddress()
            }
            fakestudents.push(fakeStudent)
    }
    await StudentModel.insertMany(fakestudents)

}

async function getDetailStudent(id){
    const student = await StudentModel.findById(id)
    if(!student){
        throw new Exception(Exception.VALIDATION_ERROR,{
            message:"Student not found"
        })
    }
    return student??{}

}


export default {
    getAllStudents,
    insertStudent,
    genFakerStudent,
    getDetailStudent,
    updateStudent
}