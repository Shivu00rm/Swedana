import { siteConfig } from '../config/siteConfig';

interface WhatsAppLinkProps {
    productName: string;
    category?: string;
    size?: string;
}

/**
 * Generates a WhatsApp click-to-chat URL with a pre-filled message.
 * Uses the phone number from siteConfig.
 */
export const getWhatsAppLink = ({ productName, category, size }: WhatsAppLinkProps): string => {
    // Get phone number from config and clean it (remove spaces, dashes, parentheses)
    const phoneNumber = (siteConfig.contact.whatsapp || siteConfig.contact.phone).replace(/[^0-9]/g, '');

    // Construct the message
    let message = `Hi, I'm interested in buying the ${productName}`;

    if (category) {
        message += ` (${category})`;
    }

    if (size) {
        message += ` - ${size}`;
    }

    message += '. Please share next steps.';

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);

    // Return the full WhatsApp URL
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};
