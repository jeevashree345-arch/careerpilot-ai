import { NextResponse } from "next/server";


const internshipDatabase = {
  "Mechanical Engineering": [
    {
      company: "Tata Technologies",
      role: "Mechanical Design Intern",
      applyLink: "https://www.tatatechnologies.com/careers/"
    },
    {
      company: "Bosch",
      role: "Manufacturing Intern",
      applyLink: "https://www.bosch.in/careers/"
    },
    {
      company: "Siemens",
      role: "CAD Intern",
      applyLink: "https://www.siemens.com/careers"
    }
  ],

  "Civil Engineering": [
    {
      company: "L&T Construction",
      role: "Site Engineering Intern",
      applyLink: "https://www.larsentoubro.com/careers/"
    },
    {
      company: "AECOM",
      role: "Structural Engineering Intern",
      applyLink: "https://aecom.com/careers/"
    },
    {
      company: "Shapoorji Pallonji",
      role: "Construction Intern",
      applyLink: "https://www.shapoorjipallonji.com/careers"
    }
  ],

  "Electronics": [
    {
      company: "Intel",
      role: "Embedded Systems Intern",
      applyLink: "https://www.intel.com/content/www/us/en/jobs/jobs-at-intel.html"
    },
    {
      company: "Texas Instruments",
      role: "Hardware Design Intern",
      applyLink: "https://careers.ti.com"
    },
    {
      company: "Qualcomm",
      role: "VLSI Intern",
      applyLink: "https://www.qualcomm.com/company/careers"
    }
  ],

  "Electrical": [
    {
      company: "Siemens",
      role: "Power Systems Intern",
      applyLink: "https://www.siemens.com/careers"
    },
    {
      company: "ABB",
      role: "Electrical Design Intern",
      applyLink: "https://careers.abb"
    },
    {
      company: "Schneider Electric",
      role: "Energy Management Intern",
      applyLink: "https://careers.se.com"
    }
  ],

  "Computer Science": [
    {
      company: "Infosys",
      role: "Software Engineer Intern",
      applyLink: "https://www.infosys.com/careers/"
    },
    {
      company: "TCS",
      role: "Backend Developer Intern",
      applyLink: "https://www.tcs.com/careers"
    },
    {
      company: "Wipro",
      role: "Full Stack Intern",
      applyLink: "https://careers.wipro.com"
    }
  ],

  "Information Technology": [
    {
      company: "Infosys",
      role: "Software Engineer Intern",
      applyLink: "https://www.infosys.com/careers/"
    },
    {
      company: "TCS",
      role: "Backend Developer Intern",
      applyLink: "https://www.tcs.com/careers"
    }
  ],

  "Artificial Intelligence": [
    {
      company: "NVIDIA",
      role: "AI Intern",
      applyLink: "https://www.nvidia.com/en-us/about-nvidia/careers/"
    },
    {
      company: "Microsoft",
      role: "Machine Learning Intern",
      applyLink: "https://careers.microsoft.com"
    },
    {
      company: "Google",
      role: "AI Research Intern",
      applyLink: "https://careers.google.com"
    }
  ]
};

export async function POST(req) {
  try {
    const { domain, skills } = await req.json();
    let normalizedDomain = domain;

    if (domain?.includes("Mechanical"))
      normalizedDomain = "Mechanical Engineering";
    
    if (domain?.includes("Civil"))
      normalizedDomain = "Civil Engineering";
    
    if (domain?.includes("Electronics"))
      normalizedDomain = "Electronics";
    
    if (domain?.includes("Electrical"))
      normalizedDomain = "Electrical";
    
    if (
      domain?.includes("Computer") ||
      domain?.includes("Information Technology")
    )
      normalizedDomain = "Computer Science";
    
    if (
      domain?.includes("Artificial Intelligence") ||
      domain?.includes("AI")
    )
      normalizedDomain = "Artificial Intelligence";
    
    console.log("Domain:", domain);
    console.log("Normalized Domain:", normalizedDomain);
    const internships =
      internshipDatabase[normalizedDomain] || [];

      const enriched = internships.map((internship) => ({
        ...internship,
        whyMatch: `Recommended for ${normalizedDomain} students based on their skills and career path.`
      }));

    return NextResponse.json({
      internships: enriched
    });

  } catch (error) {
    console.error("INTERNSHIP API ERROR:", error);
    return NextResponse.json(
      {
        error: error.message
      },
      {
        status: 500
      }
    );
  }
}