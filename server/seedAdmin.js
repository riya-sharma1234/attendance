import bcrypt from "bcryptjs";
import User from "./src/models/user.models.js";

const seedAdmins = async () => {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admins = [
      {
        name: "Admin One",
        email: "admin1@example.com",
        password: hashedPassword,
        role: "admin",
        designation : "Executive",
        department:"HR",
        employeeCode: "ADM001",
        joiningDate: new Date(),
        appraisalDate:new Date(),
        salary:35000
      },
      {
        name: "Admin Two",
        email: "admin2@example.com",
        password: hashedPassword,
        role: "admin",
        designation : "Executive",
        department:"HR",
        employeeCode: "ADM001",
        joiningDate: new Date(),
        appraisalDate:new Date(),
        salary:35000
      }
    ];

    for (const admin of admins) {
      const exists = await User.findOne({ email: admin.email });
      if (!exists) {
        await User.create(admin);
        console.log(` Created admin: ${admin.email}`);
      } else {
        console.log(` Admin already exists: ${admin.email}`);
      }
    }

    console.log("Seeding process completed!");
  } catch (error) {
    console.error("Error seeding admins:", error);
  }
};

export default seedAdmins;
