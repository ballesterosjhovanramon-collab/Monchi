import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);

    // Style for the neon green text
    const titleTextStyle = `
        text-green-400 
        font-['Permanent_Marker',_cursive]
        [text-shadow:
            -2px_-2px_0_#34d399,2px_-2px_0_#34d399,-2px_2px_0_#34d399,2px_2px_0_#34d399,
            -3px_-3px_10px_#34d399,3px_-3px_10px_#34d399,-3px_3px_10px_#34d399,3px_3px_10px_#34d399]
    `;

    // Style for the green text with black outline
    const mainTextStyle = `
        text-green-400 
        font-['Permanent_Marker',_cursive]
        [text-shadow:
            -1.5px_-1.5px_0_#000,1.5px_-1.5px_0_#000,-1.5px_1.5px_0_#000,1.5px_1.5px_0_#000]
    `;

    const bgImageUrl = `bg-[url('https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop')]`;

    const handleRsvpClick = async () => {
        setIsLoading(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = "You are the witty and slightly chaotic assistant for an exclusive, high-energy party. A guest has just RSVP'd. Generate a short, fun, and energetic confirmation message for them. Keep it under 20 words and match the 'good vibes only' but edgy party theme.";
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            alert(response.text);
        } catch (error) {
            console.error("Error generating RSVP confirmation:", error);
            alert("Oops! Something went wrong. Just show up and we'll figure it out.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-black antialiased">
            <div 
                className={`relative w-full max-w-md aspect-[9/16] bg-cover bg-center overflow-hidden shadow-2xl shadow-green-500/20 rounded-lg border-2 border-green-500/50 ${bgImageUrl}`}
            >
                {/* Overlay to darken and color the background image */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
                
                {/* Neon/Confetti effect overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(52,211,153,0.3),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.3),transparent_40%)] mix-blend-hard-light"></div>

                <div className="relative z-10 flex flex-col h-full p-6 sm:p-8 text-center text-white">
                    {/* Top Title */}
                    <header className="flex-shrink-0">
                        <h1
                            className={`text-6xl md:text-7xl lg:text-8xl font-black leading-none ${titleTextStyle}`}
                        >
                            A GOOD TIME
                        </h1>
                    </header>
                    
                    {/* Main Event Details */}
                    <main className="flex-grow flex flex-col items-center justify-center py-8 space-y-8">
                        <div className="border-4 border-white p-4 -rotate-2 transform shadow-[4px_4px_0_0_#fff,-4px_-4px_0_0_#a78bfa] transition-transform hover:rotate-0 hover:scale-105 duration-300 ease-in-out">
                            <p
                                className={`text-2xl md:text-3xl lg:text-4xl uppercase leading-tight tracking-wide ${mainTextStyle}`}
                            >
                                Saturday. 10 PM:
                                <br/>
                                Invite Only
                                <br/>
                                No Straps
                                <br/>
                                No Beef
                            </p>
                        </div>

                         {/* Action Buttons */}
                         <div className="flex flex-col sm:flex-row gap-4 items-center">
                            <button
                                onClick={handleRsvpClick}
                                disabled={isLoading}
                                className={`px-8 py-3 bg-green-400 text-black font-['Permanent_Marker',_cursive] text-2xl border-2 border-black rounded-md shadow-[3px_3px_0_0_#000] transition-all duration-200 ease-in-out hover:bg-green-300 hover:shadow-[5px_5px_0_0_#000] active:bg-green-500 active:shadow-[1px_1px_0_0_#000] disabled:bg-gray-500 disabled:cursor-not-allowed ${isLoading ? 'animate-pulse' : ''}`}
                            >
                                {isLoading ? 'Confirming...' : 'RSVP NOW'}
                            </button>
                        </div>
                    </main>

                    {/* Bottom Details */}
                    <footer className="flex-shrink-0">
                        <p className="text-base sm:text-lg font-sans font-medium tracking-wider text-gray-300 [text-shadow:1px_1px_2px_#000]">
                            Bring your own beer. Good vibes only. Fire pit will be made...
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default App;