import React from 'react';
import whatsappicon from '../../assets/images/featureicons/whatsapp.svg';

const WhatsAppBubble = () => {
    return (
        <div className="fixed bottom-8 right-8 z-50 transition-transform bg-[#075E54] p-3 rounded-full transform hover:scale-110">
            <a aria-label="Chat on WhatsApp" href="https://wa.me/94742081318" target="_blank" rel="noopener noreferrer">
                <img alt="Chat on WhatsApp" src={whatsappicon} className="w-10 h-auto cursor-pointer" />
            </a>
        </div>
    );
};

export default WhatsAppBubble;
