import { ImageInputDTO, GetImgInputDTO, TagInputDTO} from "../src/business/entities/Image"
import { ImageBusiness } from "../src/business/ImageBusiness"

const token = jest.fn((input: any): any => {
    return { id: "id" };
});

describe("Testing register image", () =>{
    const idGenerator = { generate: jest.fn() } as any
    const authenticator = { generateToken: token } as any;
    const imageDatabase = { createImage: jest.fn() } as any

    test("Error when 'subtitle' is empty", async () =>{
        const imageBusiness: ImageBusiness = new ImageBusiness(
            idGenerator,
            authenticator,
            imageDatabase
        )

        const input: ImageInputDTO = {
            subtitle: "teste",
            author_id: "id_teste",
            file: "fileTeste",
            collection: "collectionTeste",
            tags: ["#teste"],
            token: "tokenTeste"
        }
    
        try {
            await imageBusiness.createImage(input)

        } catch (error) {
            expect(error.message).toBe("'subtitle' property is missing")  
            expect(error.statusCode).toBe(404)
        }
    })
})