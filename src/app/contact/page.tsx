

export default function Contact() {
  return (
    <div className="container mx-auto p-4 mt-16">
      <h1 className="text-3xl font-bold mb-4 text-center">Contact Us</h1>
      
      <form className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg mb-2">Name</label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Your Name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg mb-2">Email</label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Your Email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-lg mb-2">Message</label>
          <textarea
            id="message"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Your Message"
            rows={4}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
