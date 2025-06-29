using System;
using System.Windows.Forms;

namespace SystemValidator
{
    public partial class ValidationOptionsDialog : Form
    {
        public ValidationOptions ValidationOptions { get; private set; } = new ValidationOptions();

        private CheckBox mechanicalCheck;
        private CheckBox electricalCheck;
        private CheckBox plumbingCheck;
        private CheckBox connectivityCheck;
        private CheckBox systemIntegrityCheck;
        private CheckBox orphanedElementsCheck;
        private Button okButton;
        private Button cancelButton;

        public ValidationOptionsDialog()
        {
            InitializeComponent();
            LoadDefaults();
        }

        private void InitializeComponent()
        {
            this.Text = "MEP System Validation Options";
            this.Size = new System.Drawing.Size(400, 350);
            this.StartPosition = FormStartPosition.CenterParent;
            this.FormBorderStyle = FormBorderStyle.FixedDialog;
            this.MaximizeBox = false;
            this.MinimizeBox = false;

            int yPos = 20;

            // Title
            var titleLabel = new Label
            {
                Text = "Select MEP Systems to Validate:",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(300, 20),
                Font = new System.Drawing.Font("Microsoft Sans Serif", 10, System.Drawing.FontStyle.Bold)
            };
            yPos += 35;

            // System type checkboxes
            mechanicalCheck = new CheckBox
            {
                Text = "Mechanical Systems (HVAC, Ductwork)",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(350, 25),
                Checked = true
            };
            yPos += 30;

            electricalCheck = new CheckBox
            {
                Text = "Electrical Systems (Power, Lighting)",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(350, 25),
                Checked = true
            };
            yPos += 30;

            plumbingCheck = new CheckBox
            {
                Text = "Plumbing Systems (Water, Sewer, Gas)",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(350, 25),
                Checked = true
            };
            yPos += 40;

            // Validation type checkboxes
            var validationLabel = new Label
            {
                Text = "Validation Checks to Perform:",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(300, 20),
                Font = new System.Drawing.Font("Microsoft Sans Serif", 10, System.Drawing.FontStyle.Bold)
            };
            yPos += 35;

            connectivityCheck = new CheckBox
            {
                Text = "Check System Connectivity",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(350, 25),
                Checked = true
            };
            yPos += 30;

            systemIntegrityCheck = new CheckBox
            {
                Text = "Validate System Integrity",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(350, 25),
                Checked = true
            };
            yPos += 30;

            orphanedElementsCheck = new CheckBox
            {
                Text = "Find Orphaned Elements",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(350, 25),
                Checked = true
            };
            yPos += 40;

            // Buttons
            okButton = new Button
            {
                Text = "Start Validation",
                Location = new System.Drawing.Point(200, yPos),
                Size = new System.Drawing.Size(120, 35),
                DialogResult = DialogResult.OK
            };
            okButton.Click += OkButton_Click;

            cancelButton = new Button
            {
                Text = "Cancel",
                Location = new System.Drawing.Point(260, yPos),
                Size = new System.Drawing.Size(80, 35),
                DialogResult = DialogResult.Cancel
            };

            this.Controls.AddRange(new Control[] 
            { 
                titleLabel,
                mechanicalCheck, electricalCheck, plumbingCheck,
                validationLabel,
                connectivityCheck, systemIntegrityCheck, orphanedElementsCheck,
                okButton, cancelButton 
            });

            this.AcceptButton = okButton;
            this.CancelButton = cancelButton;
        }

        private void LoadDefaults()
        {
            // All options enabled by default for comprehensive validation
        }

        private void OkButton_Click(object sender, EventArgs e)
        {
            if (!mechanicalCheck.Checked && !electricalCheck.Checked && !plumbingCheck.Checked)
            {
                MessageBox.Show("Please select at least one MEP system type to validate.", 
                    "No Selection", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                this.DialogResult = DialogResult.None;
                return;
            }

            if (!connectivityCheck.Checked && !systemIntegrityCheck.Checked && !orphanedElementsCheck.Checked)
            {
                MessageBox.Show("Please select at least one validation check to perform.", 
                    "No Selection", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                this.DialogResult = DialogResult.None;
                return;
            }

            ValidationOptions = new ValidationOptions
            {
                ValidateMechanical = mechanicalCheck.Checked,
                ValidateElectrical = electricalCheck.Checked,
                ValidatePlumbing = plumbingCheck.Checked,
                CheckConnectivity = connectivityCheck.Checked,
                CheckSystemIntegrity = systemIntegrityCheck.Checked,
                FindOrphanedElements = orphanedElementsCheck.Checked
            };
        }
    }
}