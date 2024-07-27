// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Vault {
    struct Document {
        string ipfsHash; // IPFS hash for document storage
        address owner; // Owner of the document
        uint256 timestamp; // Time of document upload
    }

    mapping(uint256 => Document) private documents; // Mapping from document ID to Document
    uint256 private documentCount; // Counter for document IDs

    // Event to be emitted when a new document is uploaded
    event DocumentUploaded(uint256 indexed documentId, string ipfsHash, address indexed owner);

    // Function to upload a new document
    function uploadDocument(string memory ipfsHash) public {
        require(bytes(ipfsHash).length > 0, "IPFS hash cannot be empty");

        documentCount++;
        documents[documentCount] = Document(ipfsHash, msg.sender, block.timestamp);

        emit DocumentUploaded(documentCount, ipfsHash, msg.sender);
    }

    // Function to retrieve a document's details
    function getDocument(uint256 documentId) public view returns (string memory, address, uint256) {
        require(documentId > 0 && documentId <= documentCount, "Document ID out of range");

        Document memory doc = documents[documentId];
        return (doc.ipfsHash, doc.owner, doc.timestamp);
    }

    // Function to get the total number of documents
    function getDocumentCount() public view returns (uint256) {
        return documentCount;
    }
}
