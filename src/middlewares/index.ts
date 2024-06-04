import ensureAuthMiddleware from "./ensureAuth.middleware";
import ensureCommentExistsMiddleware from "./ensureCommentExists.middleware";
import ensureCommentOwnerMiddleware from "./ensureCommentOwner.middleware";
import ensureDataIsValidMiddleware from "./ensureDataIsValid.middleware";
import ensureEmailUniqueMiddleware from "./ensureEmailUnique.middleware";
import ensureNotVehicleOwnerMiddleware from "./ensureNotVehicleOwner.middleware";
import ensureUserSellerMiddleware from "./ensureUserSeller.middleware";
import ensureVehicleAvailableMiddleware from "./ensureVehicleAvailable.middleware";
import ensureVehicleActiveExistsMiddleware from "./ensureVehicleActiveExists.middleware";
import ensureVehicleExistsMiddleware from "./ensureVehicleExists.middleware";
import ensureVehicleOwnerMiddleware from "./ensureVehicleOwner.middleware";
import handleErrorMiddleware from "./handleErrors.middleware";
import verifyGoodBuyMiddleware from "./verifyGoodBuy.middleware";

export default {
  ensureAuthMiddleware,
  ensureCommentExistsMiddleware,
  ensureCommentOwnerMiddleware,
  ensureDataIsValidMiddleware,
  ensureEmailUniqueMiddleware,
  ensureNotVehicleOwnerMiddleware,
  ensureUserSellerMiddleware,
  ensureVehicleAvailableMiddleware,
  ensureVehicleActiveExistsMiddleware,
  ensureVehicleExistsMiddleware,
  ensureVehicleOwnerMiddleware,
  handleErrorMiddleware,
  verifyGoodBuyMiddleware,
};
