import * as React from "react"
import "../App.css"
import { styled } from "@mui/material/styles"
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp"
import MuiAccordion from "@mui/material/Accordion"
import MuiAccordionSummary from "@mui/material/AccordionSummary"
import MuiAccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}))

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}))

const stepOne = (
  <span className="font-medium text-gray-400 text-sm">
    ກ່ອນທີຈະເຂົ້ານຳໃຊ້ລະບົບໄດ້ ຕ້ອງໄດ້ສະໝັກ ບັນຊີໃໝ່ຈາກຟອມສະໝັກບັນຊີ ເຊັ່ນ:
    ປ້ອນຊື່ຜູ້ໃຊ້, ອີເມວ, ເບີໂທ, ລະຫັດຜ່ານ ແລະ ຢືນຢັນລະຫັດຜ່ານ
    ພຽງເທົ່ານີ້ທ່ານກໍ່ສາມາດເຂົ້າລະບົບໄດ້ແລ້ວ. ແຕ່ຍັງບໍ່ສາມາດທຳທຸລະກຳອື່ນຫຼາຍຢ່າງ
    ນອກຈາກແກ້ໄຂຂໍ້ມູນຂອງຕົນເອງ ແລະ ເພິ່ມຂໍ້ມູນໂປຣໄຟຣ
  </span>
)

export default function QuestionApp() {
  const [expanded, setExpanded] = React.useState("panel1")

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>
            <span className="font-medium text-gray-500">
              ວິທີການສະໝັກບັນຊີເພື່ອເຂົ້ານຳໃຊ້ລະບົບ?
            </span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>{stepOne}</AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>
            <span className="font-medium text-gray-500">
              ການກຳນົດບົດບາດໃຫ້ກັບ User ຫຼື
              ບັນຊີທີຍັງບໍ່ສາມາດເຄື່ອນໄຫວທຸລະກຳໄດ້?
            </span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>{stepOne}</AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>
            <span className="font-medium text-gray-500">
              ຂັ້ນຕອນການທຳງານຂອງ ລະບົບ Software
            </span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>{stepOne}</AccordionDetails>
      </Accordion>
    </div>
  )
}
