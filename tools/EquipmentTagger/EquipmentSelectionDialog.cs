using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;

namespace EquipmentTagger
{
    public partial class EquipmentSelectionDialog : Form
    {
        public List<EquipmentType> SelectedEquipmentTypes { get; private set; } = new List<EquipmentType>();

        private CheckedListBox equipmentListBox;
        private Button okButton;
        private Button cancelButton;
        private Button selectAllButton;
        private Button clearAllButton;

        public EquipmentSelectionDialog()
        {
            InitializeComponent();
            PopulateEquipmentTypes();
        }

        private void InitializeComponent()
        {
            this.Text = "Select Equipment Types to Tag";
            this.Size = new System.Drawing.Size(400, 300);
            this.StartPosition = FormStartPosition.CenterParent;
            this.FormBorderStyle = FormBorderStyle.FixedDialog;
            this.MaximizeBox = false;
            this.MinimizeBox = false;

            // Equipment list
            equipmentListBox = new CheckedListBox
            {
                Location = new System.Drawing.Point(12, 12),
                Size = new System.Drawing.Size(360, 180),
                CheckOnClick = true
            };

            // Buttons
            selectAllButton = new Button
            {
                Text = "Select All",
                Location = new System.Drawing.Point(12, 200),
                Size = new System.Drawing.Size(80, 30)
            };
            selectAllButton.Click += SelectAllButton_Click;

            clearAllButton = new Button
            {
                Text = "Clear All", 
                Location = new System.Drawing.Point(100, 200),
                Size = new System.Drawing.Size(80, 30)
            };
            clearAllButton.Click += ClearAllButton_Click;

            okButton = new Button
            {
                Text = "OK",
                Location = new System.Drawing.Point(210, 200),
                Size = new System.Drawing.Size(80, 30),
                DialogResult = DialogResult.OK
            };
            okButton.Click += OkButton_Click;

            cancelButton = new Button
            {
                Text = "Cancel",
                Location = new System.Drawing.Point(292, 200),
                Size = new System.Drawing.Size(80, 30),
                DialogResult = DialogResult.Cancel
            };

            this.Controls.AddRange(new Control[] 
            { 
                equipmentListBox, 
                selectAllButton, 
                clearAllButton, 
                okButton, 
                cancelButton 
            });

            this.AcceptButton = okButton;
            this.CancelButton = cancelButton;
        }

        private void PopulateEquipmentTypes()
        {
            var equipmentTypes = new Dictionary<EquipmentType, string>
            {
                { EquipmentType.MechanicalEquipment, "Mechanical Equipment (HVAC)" },
                { EquipmentType.ElectricalEquipment, "Electrical Equipment (Panels, etc.)" },
                { EquipmentType.PlumbingFixtures, "Plumbing Fixtures (Sinks, Toilets, etc.)" },
                { EquipmentType.AirTerminals, "Air Terminals (Diffusers, Grilles)" },
                { EquipmentType.LightingFixtures, "Lighting Fixtures" }
            };

            foreach (var kvp in equipmentTypes)
            {
                equipmentListBox.Items.Add(new EquipmentTypeItem
                {
                    EquipmentType = kvp.Key,
                    DisplayName = kvp.Value
                });
            }

            // Select common types by default
            for (int i = 0; i < equipmentListBox.Items.Count; i++)
            {
                var item = (EquipmentTypeItem)equipmentListBox.Items[i];
                if (item.EquipmentType == EquipmentType.MechanicalEquipment ||
                    item.EquipmentType == EquipmentType.ElectricalEquipment ||
                    item.EquipmentType == EquipmentType.AirTerminals)
                {
                    equipmentListBox.SetItemChecked(i, true);
                }
            }
        }

        private void SelectAllButton_Click(object sender, EventArgs e)
        {
            for (int i = 0; i < equipmentListBox.Items.Count; i++)
            {
                equipmentListBox.SetItemChecked(i, true);
            }
        }

        private void ClearAllButton_Click(object sender, EventArgs e)
        {
            for (int i = 0; i < equipmentListBox.Items.Count; i++)
            {
                equipmentListBox.SetItemChecked(i, false);
            }
        }

        private void OkButton_Click(object sender, EventArgs e)
        {
            SelectedEquipmentTypes.Clear();

            for (int i = 0; i < equipmentListBox.Items.Count; i++)
            {
                if (equipmentListBox.GetItemChecked(i))
                {
                    var item = (EquipmentTypeItem)equipmentListBox.Items[i];
                    SelectedEquipmentTypes.Add(item.EquipmentType);
                }
            }

            if (!SelectedEquipmentTypes.Any())
            {
                MessageBox.Show("Please select at least one equipment type to tag.", 
                    "No Selection", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                this.DialogResult = DialogResult.None;
                return;
            }
        }

        private class EquipmentTypeItem
        {
            public EquipmentType EquipmentType { get; set; }
            public string DisplayName { get; set; }

            public override string ToString()
            {
                return DisplayName;
            }
        }
    }
}