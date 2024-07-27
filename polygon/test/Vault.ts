import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, ContractFactory, Signer } from "ethers";
import { Vault, Vault__factory } from "../typechain-types";

describe("Vault Contract", function () {
  let Vault: ContractFactory;
  let vault: Contract;
  let owner: Signer;
  let addr1: Signer;

  beforeEach(async function () {
    Vault = await ethers.getContractFactory("Vault");
    [owner, addr1] = await ethers.getSigners();
    vault = await Vault__factory.deploy();
    await vault.deployed();
  });

  describe("Deployment", function () {
    it("Should deploy successfully", async function () {
      expect(vault.address).to.properAddress;
    });
  });

  describe("Document Upload", function () {
    it("Should upload a document and return the correct document ID", async function () {
      const ipfsHash = "QmHashExample";
      const tx = await vault.uploadDocument(ipfsHash);
      const receipt = await tx.wait();
      const documentId = receipt.events[0].args.documentId;

      expect(documentId).to.equal(1);

      const documentCount = await vault.getDocumentCount();
      expect(documentCount).to.equal(1);

      const document = await vault.getDocument(1);
      expect(document[0]).to.equal(ipfsHash);
      expect(document[1]).to.equal(await owner.getAddress());
      expect(document[2]).to.be.a("number");
    });

    it("Should allow multiple users to upload documents", async function () {
      const ipfsHash1 = "QmHashExample1";
      const ipfsHash2 = "QmHashExample2";

      const tx1 = await vault.uploadDocument(ipfsHash1);
      const receipt1 = await tx1.wait();
      const documentId1 = receipt1.events[0].args.documentId;

      expect(documentId1).to.equal(1);

      const tx2 = await vault.connect(addr1).uploadDocument(ipfsHash2);
      const receipt2 = await tx2.wait();
      const documentId2 = receipt2.events[0].args.documentId;

      expect(documentId2).to.equal(2);

      const documentCount = await vault.getDocumentCount();
      expect(documentCount).to.equal(2);

      const document1 = await vault.getDocument(1);
      expect(document1[0]).to.equal(ipfsHash1);
      expect(document1[1]).to.equal(await owner.getAddress());
      expect(document1[2]).to.be.a("number");

      const document2 = await vault.getDocument(2);
      expect(document2[0]).to.equal(ipfsHash2);
      expect(document2[1]).to.equal(await addr1.getAddress());
      expect(document2[2]).to.be.a("number");
    });
  });

  describe("Document Retrieval", function () {
    it("Should return the correct document details", async function () {
      const ipfsHash = "QmHashExample";

      await vault.uploadDocument(ipfsHash);
      const document = await vault.getDocument(1);

      expect(document[0]).to.equal(ipfsHash);
      expect(document[1]).to.equal(await owner.getAddress());
      expect(document[2]).to.be.a("number");
    });

    it("Should return empty values for non-existent documents", async function () {
      await expect(vault.getDocument(999)).to.be.revertedWith("Document ID out of range");
    });
  });
});
