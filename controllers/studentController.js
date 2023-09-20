import HttpStatus from '../exceptions/HttpStatus.js'
import { studentRepository } from '../repositories/index.js'
import Exception from '../exceptions/Exceptions.js'
import student from '../repositories/student.js'
import { MAX_RECORDS } from '../Global/constant.js'

async function getAllStudents(req,res) {
    let {page = 1, size = MAX_RECORDS, searchString = ''} = req.query
    size = size >= MAX_RECORDS ? MAX_RECORDS : size
    try{
        
        let filterStudents = await studentRepository.getAllStudents({
            page,
            size,
            searchString
        })
        res.status(HttpStatus.OK).json({
            message:"Get all students successfully",
            size:filterStudents.length,
            page,
            size,
            searchString,
            data:filterStudents,
        })
    }catch(exceptions){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: exceptions.message,
        })
    }
}

async function getStudentById(req,res) {
    let studentId = req.params.id
    try{
        const student = await studentRepository.getDetailStudent(studentId)
        res.status(HttpStatus.OK).json({
            message:"Get detail student successfully",
            data:student
        })

    }
    catch(exceptions){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message:"Cannot get student by id:"  + exceptions,
            validatorErrors: exceptions.validatorErrors
        })
    }
}

async function insertStudent(req,res) { 
    try{
        const student = await studentRepository.insertStudent(req.body)
        res.status(HttpStatus.OK).json({
            message:"Insert student successfully",
            data:student
        })
    }catch(exceptions){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message:"Cannot insert student:"  + exceptions,
            validatorErrors: exceptions.validatorErrors
        })
    }
}

async function genFakerStudent(req,res){
    try{
        const fakestudent = await studentRepository.genFakerStudent(req.body)
        res.status(HttpStatus.OK).json({
            message:'Insert fakestudent successfully',
            data:fakestudent
        })
    }catch(exceptions){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message:"Can not fake students insert"+exceptions,
            validatorErrors:exceptions.validatorErrors
        })

    }
}

async function updateStudent(req,res) {
    const {
        id,
        name,
        age,
        address,
        phoneNumber,
        email,
        gender
    } = req.body
    try{
        const student = await studentRepository.updateStudent(req.body)
        res.status(HttpStatus.OK).json({
            message:"Update student successfully",
            data:student
        })
    }catch(exceptions){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message:"Cannot update student:"  + exceptions,
            validatorErrors: exceptions.validatorErrors
        })
    }
    
}

export default {
    getAllStudents,
    getStudentById,
    insertStudent,
    updateStudent,
    genFakerStudent,
    
}