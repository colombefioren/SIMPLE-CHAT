const ChatMessage = () => {
    const mockMessages = [
        { sender: "you", message: "Hello, how are you?" },
        { sender: "Jane", message: "I'm doing well, thanks for asking." },
    ]
  return (
    <div className="flex flex-col space-y-6">
      {mockMessages.map((message, index) => (
        <div
          key={index}
          className={`flex items-center ${
            message.sender === "you" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`px-4 py-2 rounded-lg ${
              message.sender === "you"
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {message.message}
          </div>
        </div>
      ))}
    </div>
  )
}
export default ChatMessage