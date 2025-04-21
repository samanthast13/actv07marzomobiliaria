import { Database } from "../db/Fakedb";

export class Listcontroller {
    private database: Database;

    constructor() {
        this.database = new Database();
    }

    async calculatePercentile(data: number[], percentile: number) {
        const index = (percentile / 100) * (data.length - 1);
        const lower = Math.floor(index);
        const fraction = index - lower;

        if (lower >= data.length - 1) return data[data.length - 1];
        if (lower < 0) return data[0];

        return data[lower] + fraction * (data[lower + 1] - data[lower]);
    }

    async boxplot() {
        let data = await this.database.db();

        if (!data || data.length === 0) {
            throw new Error("No data available");
        }

        data = [...data].sort((a, b) => a - b);

        const length = data.length;
        const min = data[0];
        const max = data[length - 1];

        const mid = await this.calculatePercentile(data, 50);
        const q1 = await this.calculatePercentile(data, 25);
        const q3 = await this.calculatePercentile(data, 75);

        const iqr = q3 - q1;
        const lowerFence = q1 - 1.5 * iqr;
        const upperFence = q3 + 1.5 * iqr;

        const outliers = data.filter(value => value < lowerFence || value > upperFence);

        return {
            min,
            max,
            mid,
            q1,
            q3,
            outliers,
            data
        };
    }
}
