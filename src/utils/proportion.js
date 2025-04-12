function proportion(arr, max) {
    const biggest = Math.max(...arr);
    return arr.map(el => el / biggest * max);
}

export default proportion;