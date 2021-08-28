import { Router } from "express";

const router = Router();
const data = [
  { Title: 'Porsche', Date: 2, Description: 'Blue' },
  { Title: 'BMW', Date: 1, Description: 'Grey' },
  { Title: 'Renault', Date: 2, Description: 'Yellow' },
  { Title: 'Volkswagen', Date: 7, Description: 'Matte Red' },
  { Title: 'Porsche', Date: 2, Description: 'Silver Grey' },
  { Title: 'Jaguar', Date: 6, Description: 'Electric Blue' },
  { Title: 'Mistubishi', Date: 4, Description: 'Black' },
  { Title: 'Toyota', Date: 9, Description: 'Copper' },
  { Title: 'Honda', Date: 12, Description: 'Biege' }
]

router.get("/Posts", (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
  res.send(200);
});



export { router as BlogRouter };
