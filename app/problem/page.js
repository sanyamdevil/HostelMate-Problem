// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";

// // ✅ chair details will come from context or localStorage
// export default function ComplaintForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     roomNumber: "",
//     phoneNumber: "",
//     options: [],
//     message: "",
//     chairDetails: null, // ✅ new field
//   });

//   const [status, setStatus] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // ✅ Load chair details if filled earlier
//   useEffect(() => {
//     const savedChair = localStorage.getItem("chairDetails");
//     if (savedChair) {
//       setFormData((prev) => ({ ...prev, chairDetails: JSON.parse(savedChair) }));
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { id, value, type, checked } = e.target;

//     if (type === "checkbox") {
//       setFormData((prev) => ({
//         ...prev,
//         options: checked
//           ? [...prev.options, value]
//           : prev.options.filter((opt) => opt !== value),
//       }));
//     } else {
//       setFormData({ ...formData, [id]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (isSubmitting) return;
//     setIsSubmitting(true);
//     setStatus("Submitting...");

//     // ✅ block submit if chair problem is selected but details missing
//     if (formData.options.includes("chair problem") && !formData.chairDetails) {
//       setStatus("⚠️ Please fill chair details before submitting.");
//       setIsSubmitting(false);
//       return;
//     }

//     console.log("Submitting:", formData);

//     try {
//       const res = await fetch("/api/complaint", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setStatus("✅ Complaint submitted successfully!");
//         setFormData({
//           name: "",
//           roomNumber: "",
//           phoneNumber: "",
//           options: [],
//           message: "",
//           chairDetails: null,
//         });
//         localStorage.removeItem("chairDetails"); // ✅ clear after submit
//       } else {
//         setStatus("❌ Error: " + data.message);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setStatus("⚠️ Something went wrong. Try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <main className="min-h-screen flex items-center justify-center bg-gray-900 p-8">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9, y: 30 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="w-full max-w-lg bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700"
//       >
//         <h1 className="text-3xl font-bold text-center mb-6 text-white">
//           Complaint Form
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Name */}
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none text-white"
//             />
//           </div>

//           {/* Room Number */}
//           <div>
//             <label htmlFor="roomNumber" className="block text-sm font-medium mb-2 text-gray-300">
//               Room Number
//             </label>
//             <input
//               type="text"
//               id="roomNumber"
//               value={formData.roomNumber}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none text-white"
//             />
//           </div>

//           {/* Phone Number */}
//           <div>
//             <label htmlFor="phoneNumber" className="block text-sm font-medium mb-2 text-gray-300">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               id="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               required
//               pattern="[0-9]{10}"
//               className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none text-white"
//             />
//           </div>

//           {/* Options */}
//           <div>
//             <label className="block text-sm font-medium mb-2 text-gray-300">
//               Select Problems
//             </label>
//             <div className="flex flex-col gap-2 text-gray-300">
//               {[
//                 "door problem",
//                 "window problem",
//                 "almirah problem",
//                 "chair problem",
//                 "balcony problem",
//                 "electric board problem",
//               ].map((option, idx) => (
//                 <label key={idx} className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     value={option}
//                     checked={formData.options.includes(option)}
//                     onChange={handleChange}
//                     className="accent-green-500"
//                   />
//                   {option}
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* ✅ Chair Details Button */}
//           {formData.options.includes("chair problem") && (
//             <div className="mt-3">
//               <a
//                 href="/problem/chair"
//                 className="block w-full text-center py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
//               >
//                 {formData.chairDetails ? "✏️ Edit Chair Details" : "➕ Fill Chair Details"}
//               </a>
//             </div>
//           )}

//           {/* Message */}
//           <div>
//             <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
//               Message
//             </label>
//             <textarea
//               id="message"
//               value={formData.message}
//               onChange={handleChange}
//               required
//               rows="4"
//               className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none text-white"
//             />
//           </div>

//           {/* Submit */}
//           <motion.button
//             type="submit"
//             disabled={isSubmitting}
//             whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
//             whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
//             transition={{ type: "spring", stiffness: 200 }}
//             className={`w-full py-2 px-4 rounded-lg font-semibold shadow-lg transition-all duration-300
//               ${isSubmitting 
//                 ? "bg-gray-500 cursor-not-allowed text-gray-300" 
//                 : "bg-green-600 text-white hover:bg-green-700"}`}
//           >
//             {isSubmitting ? "Submitting..." : "Submit Complaint"}
//           </motion.button>
//         </form>

//         {status && <p className="mt-4 text-center text-gray-300">{status}</p>}
//       </motion.div>
//     </main>
//   );
// }


"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ComplaintForm() {
  const [formData, setFormData] = useState({
    name: "",
    roomNumber: "",
    phoneNumber: "",
    options: [],
    message: "",
  });

  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ prevent multiple submits

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        options: checked
          ? [...prev.options, value]
          : prev.options.filter((opt) => opt !== value),
      }));
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // ✅ block double click
    setIsSubmitting(true);
    setStatus("Submitting...");

    console.log(formData);

    try {
      const res = await fetch("/api/complaint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("✅ Complaint submitted successfully!");
        setFormData({
          name: "",
          roomNumber: "",
          phoneNumber: "",
          options: [],
          message: "",
        });
      } else {
        setStatus("❌ Error: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("⚠️ Something went wrong. Try again.");
    } finally {
      setIsSubmitting(false); // ✅ enable button again
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          Complaint Form
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none text-white"
            />
          </div>

          {/* Room Number */}
          <div>
            <label htmlFor="roomNumber" className="block text-sm font-medium mb-2 text-gray-300">
              Room Number
            </label>
            <input
              type="text"
              id="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none text-white"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium mb-2 text-gray-300">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none text-white"
            />
          </div>

          {/* Options */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Select Problems
            </label>
            <div className="flex flex-col gap-2 text-gray-300">
              {[
                "door problem",
                "window problem",
                "almirah problem",
                "chair problem",
                "balcony problem",
                "electric board problem",
              ].map((option, idx) => (
                <label key={idx} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={option}
                    checked={formData.options.includes(option)}
                    onChange={handleChange}
                    className="accent-green-500"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
              Message
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none text-white"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting} // ✅ disable button while submitting
            whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`w-full py-2 px-4 rounded-lg font-semibold shadow-lg transition-all duration-300
              ${isSubmitting 
                ? "bg-gray-500 cursor-not-allowed text-gray-300" 
                : "bg-green-600 text-white hover:bg-green-700"}`}
          >
            {isSubmitting ? "Submitting..." : "Submit Complaint"}
          </motion.button>
        </form>

        {status && <p className="mt-4 text-center text-gray-300">{status}</p>}
      </motion.div>
    </main>
  );
}
