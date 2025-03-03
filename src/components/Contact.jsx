import React from "react";

const Contact = () => {
  return (
    <div className="mt-16">
      <div className="bg-base-300 p-8">
        <h1 className="text-3xl font-bold mb-4">CONTACT US</h1>
        <p className="mb-4">If any query, feel free to contact us!</p>
        <p className="mb-4">
          For any assistance and queries, mail us at{" "}
          <a
            href="mailto:support@namastedev.com"
            className="text-blue-600 hover:underline"
          >
           shaadansari8081@gmail.com
          </a>
        </p>
        <p className="mb-4">
          Our Operational Address is: Prayagraj, UttarPradesh
        </p>
      </div>
    </div>
  );
};

export default Contact;
