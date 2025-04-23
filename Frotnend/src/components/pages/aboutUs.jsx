import React from "react";
import FloatingNavBar from "../FloatingNavBar";
import { Helmet } from "react-helmet";
import Footer from "../Footer";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

const data = [
  {
    name: "Ms. Vijaya Tarmale",
    role: "Not defined",
    image: "./photos/photo1.jpg",
  },
  {
    name: "Ms. Gayatri Bhise",
    role: "Not defined",
    image: "./photos/photo2.jpg",
  },
  {
    name: "Ms. Mayuri Deshmukh ",
    role: "Not defined",
    image:
      "./photos/photo3.jpg",
  },
  {
    name: "Ms. Pallavi Ubarhande",
    role: "Not defined",
    image:
    "./photos/photo4.jpg",

  },
  {
    name: "Ms. Shreya Vaishnav",
    role: "Not defined",
    image:
      "./photos/photo5.jpg",
  },
  {
    name: "Mr. Ritesh Deokar",
    role: "Not defined",
    image:
      "./photos/photo6.jpg",
  },
];

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>HearGuard About Us</title>
      </Helmet>
      <FloatingNavBar />
      <div className="bg-[#fefff9] w-4/6 md:w-4/6  sm:w-[97%]  below-400px:w-full below-540px:w-[99%] mx-auto gap-y-10 mt-40 mb-40 px-4 sm:px-6 lg:px-8">
        <div className="shadow-md rounded-3xl py-12 px-6 sm:py-24 sm:px-12 bg-[#f3f8e2] text-center">
          <h1
            className="text-4xl sm:text-6xl md:text-8xl font-black leading-tight text-inherit text-pretty below-540px:text-wrap"
            style={{ fontFamily: "Reservation Wide,sans-serif" }}
          >
            Empowering Safety for All
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-medium leading-8 mt-4">
            HerGuard is dedicated to{" "}
            <b className="text-[0.85em]">
              creating safer environments by providing real-time insights
            </b>
          </p>
        </div>
        <div className="shadow-md bg-amber-200 rounded-3xl p-6  h-auto flex below-540px:flex-col  flex-col  sm:flex-row gap-y-6 sm:gap-x-12 mt-10">
          <img
            src="https://plit.ac.in/wp-content/uploads/2024/05/jsir.jpg"
            className="rounded-3xl w-full sm:w-96 object-cover below-540px:w-full"
            alt=""
          />
          <div className="flex flex-col gap-4">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-black text-center text-inherit text-pretty"
              style={{ fontFamily: "Reservation Wide,sans-serif" }}
            >
              Our Mentor
            </h1>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
              Dr. Pradip M Jawandhiya,
              <p className="text-base sm:text-lg font-medium">
                Principal, PLITMS
              </p>
            </h3>
            <p className="text-base sm:text-lg md:text-xl w-11/12 font-medium leading-8">
              Dr. Pradip M Jawandhiya is a distinguished academic leader and
              mentor with extensive qualifications and experience. With a
              Bachelor of Engineering (BE), Master of Engineering (ME), a
              Doctorate (PhD), and a Master of Business Administration (MBA)
              specializing in Human Resource Management (HRM), Dr. Jawandhiya
              has cultivated a deep understanding of both technical and
              managerial aspects of education. As a Principal, he has guided
              numerous students and professionals, fostering innovation,
              leadership, and excellence. His mentorship is instrumental in
              shaping the success of our project, providing valuable insights
              and support.
            </p>
          </div>
        </div>
        <div className="text-center mt-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800">
            Our Team
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          {data.map((item, index) => (
            <Card className="w-full" key={index}>
              <CardHeader floated={false} className="sm:h-60 md:h-96">
                <img
                  src={item.image}
                  className="h-full w-full object-cover"
                  alt="profile-picture"
                />
              </CardHeader>
              <CardBody className="text-center">
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {item.name}
                </Typography>
                <Typography
                  color="blue-gray"
                  className="font-medium"
                  textGradient
                >
                  {item.role}
                </Typography>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
