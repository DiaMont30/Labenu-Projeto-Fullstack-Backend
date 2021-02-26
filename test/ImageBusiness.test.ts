import { ImageInputDTO, GetImgInputDTO, TagInputDTO} from "../src/business/entities/Image"
import { ImageBusiness } from "../src/business/ImageBusiness"

const token = jest.fn((input: any): any => {
    return { id: "id" };
});

describe("Testing register image", () =>{
    const idGenerator = { generate: jest.fn() } as any
    const authenticator = { generateToken: token, getData:token } as any;
    const imageDatabase = { insertImage: jest.fn() } as any;

    test("Error when 'subtitle' is empty", async () =>{
        const imageBusiness: ImageBusiness = new ImageBusiness(
            idGenerator,
            authenticator,
            imageDatabase
        )

        const input: ImageInputDTO = {
            subtitle: "",
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
            expect(error.statusCode).toBe(406)
        }
    })

    test("Error when 'author_id' is empty", async () =>{
        const imageBusiness: ImageBusiness = new ImageBusiness(
            idGenerator,
            authenticator,
            imageDatabase
        )

        const input: ImageInputDTO = {
            subtitle: "teste",
            author_id: "",
            file: "fileTeste",
            collection: "collectionTeste",
            tags: ["#teste"],
            token: "tokenTeste"
        }
    
        try {
            await imageBusiness.createImage(input)

        } catch (error) {
            expect(error.message).toBe("'author_id' property is missing")  
            expect(error.statusCode).toBe(406)
        }
    })

    test("Error when 'file' is empty", async () =>{
        const imageBusiness: ImageBusiness = new ImageBusiness(
            idGenerator,
            authenticator,
            imageDatabase
        )

        const input: ImageInputDTO = {
            subtitle: "teste",
            author_id: "id_teste",
            file: "",
            collection: "collectionTeste",
            tags: ["#teste"],
            token: "tokenTeste"
        }
    
        try {
            await imageBusiness.createImage(input)

        } catch (error) {
            expect(error.message).toBe("'file' property is missing")  
            expect(error.statusCode).toBe(406)
        }
    })

    test("Error when 'collection' is empty", async () =>{
        const imageBusiness: ImageBusiness = new ImageBusiness(
            idGenerator,
            authenticator,
            imageDatabase
        )

        const input: ImageInputDTO = {
            subtitle: "teste",
            author_id: "id_teste",
            file: "fileTeste",
            collection: "",
            tags: ["#teste"],
            token: "tokenTeste"
        }
    
        try {
            await imageBusiness.createImage(input)

        } catch (error) {
            expect(error.message).toBe("'collection' property is missing")  
            expect(error.statusCode).toBe(406)
        }
    })

    test("Error when 'tag' is empty", async () =>{
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
            tags: [],
            token: "tokenTeste"
        }
    
        try {
            await imageBusiness.createImage(input)

        } catch (error) {
            expect(error.message).toBe("'tag' property is missing")  
            expect(error.statusCode).toBe(406)
        }
    })

    test("Error when 'token' is empty", async () =>{
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
            token: ""
        }
    
        try {
            await imageBusiness.createImage(input)

        } catch (error) {
            expect(error.message).toBe("'token' property is missing")  
            expect(error.statusCode).toBe(406)
        }
    })
    test("Testing Sucess Case", async () =>{
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
            expect(imageDatabase.insertImage).toHaveBeenCalled()
            expect(imageDatabase.insertImage).toHaveBeenCalledWith(input)
        } catch (error) {
            
        }
    })
})

describe("Testing get image by id", () =>{
    const idGenerator = { generate: jest.fn() } as any
    const authenticator = { generateToken: token, getData:token } as any;
    const imageDatabase = { selectImage: jest.fn() } as any;

    test("Error when 'token' is empty", async () =>{
        const imageBusiness: ImageBusiness = new ImageBusiness(
            idGenerator,
            authenticator,
            imageDatabase
        )

        const input: GetImgInputDTO = {
            id: "idTeste",
            token:""
        }

        try {
            await imageBusiness.getImage(input)

        } catch (error) {
            expect(error.message).toBe("'token' property is missing")  
            expect(error.statusCode).toBe(406)
        }
    })
    test("Error when 'id' is empty", async () =>{
        const imageBusiness: ImageBusiness = new ImageBusiness(
            idGenerator,
            authenticator,
            imageDatabase
        )

        const input: GetImgInputDTO = {
            id: "",
            token:"tokenTest"
        }

        try {
            await imageBusiness.getImage(input)

        } catch (error) {
            expect(error.message).toBe("'id' property is missing")  
            expect(error.statusCode).toBe(406)
        }
    })

    test("Error when image not found", async () =>{
        const imageBusiness: ImageBusiness = new ImageBusiness(
            idGenerator,
            authenticator,
            imageDatabase
        )

        const input: GetImgInputDTO = {
            id: "idTeste",
            token:"tokenTeste"
        }

        try {
            await imageBusiness.getImage(input)

        } catch (error) {
            expect(error.message).toBe("'Image not found'")  
            expect(error.statusCode).toBe(404)
        }
    })

    test("Testing Sucess Case", async () =>{
        const imageBusiness: ImageBusiness = new ImageBusiness(
            idGenerator,
            authenticator,
            imageDatabase
        )

        const input: GetImgInputDTO = {
            id: "idTeste",
            token:"tokenTeste"
        }
    
        try {
            await imageBusiness.getImage(input)
            expect(imageDatabase.selectImage).toHaveBeenCalled()
            expect(imageDatabase.selectImage).toHaveBeenCalledWith(input)
        } catch (error) {
            
        }
    })
})

