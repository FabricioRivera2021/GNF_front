export const calculateTimeDifference = (timestamp) => {
    const givenDate = new Date(timestamp);
    const currentDate = new Date();

    const diffInMilliseconds = currentDate - givenDate;
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);

    const hours = String(diffInHours % 24).padStart(2, '0');
    const minutes = String(diffInMinutes % 60).padStart(2, '0');
    const seconds = String(diffInSeconds % 60).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
};

export const handleClickFilter = (id) => {
    console.log("handleClickFilter");
    setFilterPaused(false);
    setFilterCancel(false);
    setSelectedFilter(id);
}