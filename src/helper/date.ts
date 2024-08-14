export const formatDate = (dateString: string, showTime?: boolean): string => {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return '';

        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: showTime ? '2-digit' : undefined,
            minute: showTime ? '2-digit' : undefined,
            hour12: false,
            timeZone: 'UTC'
        };

        return new Intl.DateTimeFormat('en-US', options).format(date);
    } catch (error) {
        console.error('Error formatting date:', error);
        return '';
    }
};