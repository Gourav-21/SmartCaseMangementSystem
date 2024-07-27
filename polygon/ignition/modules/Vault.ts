import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const VaultModule = buildModule("VaultModule", (m) => {
  const Vault = m.contract("Vault");

  return { Vault };
});

export default VaultModule;
