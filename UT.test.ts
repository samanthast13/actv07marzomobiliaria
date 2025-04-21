import { Listcontroller } from "./src/controller/list";
import { Database } from "./src/db/Fakedb";

jest.mock('./src/db/Fakedb', () => ({
  Database: jest.fn().mockImplementation(() => ({
    db: jest.fn()
  }))
}));

describe("ListController - boxplot calculation", () => {
  let controller: Listcontroller;
  let mockDatabase: jest.Mocked<Database>;

  beforeEach(() => {
    mockDatabase = new Database() as jest.Mocked<Database>;
    controller = new Listcontroller();
    
    const fakeData = Array.from({ length: 100 }, (_, i) => i + 1);
    mockDatabase.db.mockResolvedValue(fakeData);
    
    (controller as any).database = mockDatabase;
  });

  test("should calculate boxplot values", async () => {
    const result = await controller.boxplot();
    expect(result.min).toBe(1);
    expect(result.max).toBe(100);
  });
});
