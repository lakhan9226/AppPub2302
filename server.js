let path = require("path");

let mongoose = require("mongoose");
let express = require("express");
let cors = require("cors");
let dotenv = require("dotenv");
dotenv.config();

let app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("/getEmployees", async (req, res) => {
    let data = await Employee.find();
    res.json(data);

})

app.listen(9988, () => {
    console.log("Listening to Port 9988")
})

// const MDB = "mongodb+srv://lakhandute:<lakhanraj>@cluster0.dvw1alm.mongodb.net/mernstack?retryWrites=true&w=majority"


// mongoose.connect(MDB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// }).then(() => {
//     console.log("Connected to MDB");
// }).catch((err) => console.log("Not connected to MDB"));


let connectToMDB = async () => {

    try {

        // await mongoose.connect("mongodb://0.0.0.0/Batch2302");
        // await mongoose.connect(process.env.mdburl); this is using env and mongo atlas
        // console.log("Connect to Mdb");

        await mongoose.connect("mongodb://0.0.0.0/Batch2302");
        console.log("Connect to Mdb");


        saveToDB();


    } catch {
        console.log("Unable to Connect to Mdb");

    }
};

let employeeSchema = new mongoose.Schema({

    name: {
        type: String,
        minLength: [2, "Too Small Name"], maxLength: [20, "Too big name"]
    },
    gender: { type: String, require: true, lowercase: true, enum: ["male", "female"], },
    email: {
        type: String,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email!`
        },
        required: [true, "User email required"]
    },
    age: {
        type: Number, min: [18, "you are too young to create account"],
        max: [100, "you are to old to create account"],
        required: true,
    },
    department: String,
    location: String,

});


let Employee = new mongoose.model("employee", employeeSchema);

let saveToDB = async () => {

    try {
        let Prajay = new Employee({
            name: "Prajay",
            email: "Prajay@gmail.com",
            age: 20,
            department: "Marketing",
            location: "Hyderabad",
        });

        // let ajay = new Employee({
        //     name: "ajay",
        //     email: "ajay@gmail.com",
        //     age: 20,
        //     department: "Marketing",
        //     location: "Hyderabad",
        // });

        // let anil = new Employee({
        //     name: "anil",
        //     email: "anil@gmail.com",
        //     age: 20,
        //     department: "Marketing",
        //     location: "Hyderabad",
        // });


        Employee.insertMany([Prajay]);
        console.log("Saved to DB Successfully");
    } catch {
        console.log("Unable to save to db");
    }
};
connectToMDB();


