import {
  fetchElectricityFn,
  fetchelectricPlan,
} from "../utils/actions/electric-function.js";

const fetchMeterPlans = async (req, res) => {
  const { id: provider } = req.params;
  console.log(provider);
  const result = await fetchelectricPlan(provider);
  console.log(result);
  res.send("fetch meter plans");
};
const fetchElectricity = async (req, res) => {
  const result = await fetchElectricityFn();
  console.log(result);
  res.send("fetch electricity");
};

export { fetchMeterPlans, fetchElectricity };
