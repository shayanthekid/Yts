import React from 'react';
import whatsappicon from '../../assets/images/featureicons/whatsapp.svg';

const WhatsAppBubble = () => {
    return (
        <div className="fixed bottom-4 right-2 z-50 transition-transform bg-[#075E54] p-2 rounded-full transform hover:scale-110">
            <a aria-label="Chat on WhatsApp" href="https://wa.me/94742081318" target="_blank" rel="noopener noreferrer">
                <img alt="Chat on WhatsApp" src={whatsappicon} className="w-8 h-auto cursor-pointer" />
            </a>
        </div>
    );
};

export default WhatsAppBubble;
