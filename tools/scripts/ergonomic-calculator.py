#!/usr/bin/env python3
"""
Ergonomic Desk Setup Calculator
Calculates optimal desk, monitor, and peripheral positioning based on your measurements.
"""

import math

def calculate_ergonomic_setup(
    standing_height_cm: float,
    arm_length_cm: float = None,
    sitting_eye_height_cm: float = None
):
    """
    Calculate ergonomic setup dimensions.

    Args:
        standing_height_cm: Your height while standing (cm)
        arm_length_cm: Shoulder to fingertip length (optional, estimated if not provided)
        sitting_eye_height_cm: Eye height while sitting upright (optional, estimated if not provided)
    """

    print("=" * 70)
    print("🪑 ERGONOMIC DESK SETUP CALCULATOR")
    print("=" * 70)
    print(f"\n📏 Your measurements:")
    print(f"   Standing height: {standing_height_cm} cm")

    # Estimate arm length if not provided (typically ~40% of height)
    if arm_length_cm is None:
        arm_length_cm = standing_height_cm * 0.40
        print(f"   Arm length: {arm_length_cm:.1f} cm (estimated)")
    else:
        print(f"   Arm length: {arm_length_cm} cm")

    # Estimate sitting eye height if not provided (typically ~80-85% of standing height)
    if sitting_eye_height_cm is None:
        sitting_eye_height_cm = standing_height_cm * 0.82
        print(f"   Sitting eye height: {sitting_eye_height_cm:.1f} cm (estimated)")
    else:
        print(f"   Sitting eye height: {sitting_eye_height_cm} cm")

    print("\n" + "=" * 70)
    print("📐 CALCULATED ERGONOMIC SETUP")
    print("=" * 70)

    # DESK HEIGHT (SITTING)
    print("\n🪑 DESK & CHAIR:")
    sitting_desk_height = standing_height_cm / 2.48
    sitting_desk_height_alt = standing_height_cm * 0.25 + 3.5  # Alternative formula

    print(f"   Sitting desk height: {sitting_desk_height:.1f} cm")
    print(f"   (Alternative calculation: {sitting_desk_height_alt:.1f} cm)")
    print(f"   → Adjust between {sitting_desk_height-2:.1f}-{sitting_desk_height+2:.1f} cm for comfort")

    # STANDING DESK HEIGHT
    standing_desk_height = standing_height_cm / 1.58
    standing_desk_height_alt = standing_height_cm * 0.58 - 4

    print(f"\n   Standing desk height: {standing_desk_height:.1f} cm")
    print(f"   (Alternative calculation: {standing_desk_height_alt:.1f} cm)")
    print(f"   → Adjust between {standing_desk_height-3:.1f}-{standing_desk_height+3:.1f} cm for comfort")

    # CHAIR HEIGHT
    # Approximate: sitting desk height minus typical thigh clearance (15-20cm)
    chair_seat_height = sitting_desk_height - 28  # Assumes ~28cm from seat to elbow
    print(f"\n   Chair seat height: {chair_seat_height:.1f} cm")
    print(f"   → Feet should be flat on floor, knees at 90°")
    print(f"   → Knees slightly lower than hips")

    # MONITOR POSITIONING
    print("\n🖥️  MONITOR:")

    # Distance: arm's length
    monitor_distance_min = arm_length_cm * 0.75  # 51-76 cm typical range
    monitor_distance_max = arm_length_cm * 1.05
    monitor_distance_optimal = arm_length_cm * 0.90

    print(f"   Distance from eyes: {monitor_distance_optimal:.1f} cm (arm's length)")
    print(f"   → Range: {monitor_distance_min:.1f}-{monitor_distance_max:.1f} cm")
    print(f"   → Minimum 50 cm, maximum 100 cm per ANSI standards")

    # Height: top of screen at or below eye level (sitting)
    monitor_top_height = sitting_eye_height_cm
    monitor_center_height = sitting_eye_height_cm - 10  # Roughly 10cm below eye level for center

    print(f"\n   Monitor top edge: {monitor_top_height:.1f} cm from floor")
    print(f"   → Should be at or 0-8 cm below eye level")
    print(f"   Monitor center: ~{monitor_center_height:.1f} cm from floor")
    print(f"   → Viewing angle: 10-20° downward tilt")

    # DUAL MONITOR / VERTICAL MONITOR SETUP
    print("\n🖥️🖥️  DUAL MONITOR SETUP (if using vertical/portrait monitor):")

    print("\n   Vertical/Portrait Monitor:")
    print(f"   → Top edge: {monitor_top_height:.1f} cm (SAME as horizontal - at/below eye level)")
    print(f"   → Distance: {monitor_distance_optimal:.1f} cm (SAME as primary)")
    print(f"   → CRITICAL: Top never higher than eye level to avoid neck strain")

    print("\n   Placement Options:")
    print("   Option A - Equal Usage (50/50 split):")
    print("   → Both monitors centered in front of you")
    print("   → Inner edges touching or 2-5 cm apart")
    print("   → Angle both slightly concave (15-30° toward you)")
    print("   → Same height, same distance")

    print("\n   Option B - Primary + Secondary (80/20 split):")
    print("   → Primary (horizontal) centered in front of body")
    print("   → Secondary (vertical) to dominant eye side")
    print("   → Secondary angled 15-30° inward")
    print("   → Both at same height and distance")

    print("\n   ISO Viewing Standard:")
    print("   → Optimal: -35° gaze angle from horizon")
    print("   → Range: -20° to -50° acceptable")
    print("   → Avoid: 0° (horizontal) = eye strain")
    print("   → Avoid: -60° (too low) = neck strain")

    # KEYBOARD & MOUSE
    print("\n⌨️  KEYBOARD & MOUSE:")
    keyboard_height = sitting_desk_height - 2  # Slightly below desk surface for negative tilt

    print(f"   Keyboard height: {keyboard_height:.1f} cm (at home row)")
    print(f"   → Should match elbow height when seated")
    print(f"   → Place 5 cm from desk edge")
    print(f"   → Use negative slope if possible")

    print(f"\n   Mouse position:")
    print(f"   → Same height as keyboard: {keyboard_height:.1f} cm")
    print(f"   → Close to keyboard, minimal reaching")
    print(f"   → In line with keyboard (not higher/lower)")

    # WRISTS & ELBOWS
    print("\n🦾 POSTURE CHECKPOINTS:")
    print(f"   ✓ Elbows at 90-110° angle")
    print(f"   ✓ Forearms parallel to floor")
    print(f"   ✓ Wrists neutral (straight line from forearm)")
    print(f"   ✓ Feet flat on floor (or footrest)")
    print(f"   ✓ Knees at 90°, slightly below hips")
    print(f"   ✓ Lower back supported by lumbar cushion")
    print(f"   ✓ 2-5 cm gap between seat edge and back of knees")

    # LIGHTING
    print("\n💡 LIGHTING:")
    print(f"   Ambient: 300-500 lux (500 optimal)")
    print(f"   Monitor brightness: match room brightness")
    print(f"   Position: monitor at right angles to windows")
    print(f"   Tilt screen to avoid glare")
    print(f"   20-20-20 rule: Every 20 min, look 6m away for 20 sec")

    # SUMMARY TABLE
    print("\n" + "=" * 70)
    print("📋 QUICK SETUP SUMMARY FOR YOUR HEIGHT ({:.0f} cm)".format(standing_height_cm))
    print("=" * 70)
    print(f"""
    Component                 | Measurement
    --------------------------|------------------------------------------
    Sitting desk height       | {sitting_desk_height:.1f} cm (±2 cm)
    Standing desk height      | {standing_desk_height:.1f} cm (±3 cm)
    Chair seat height         | {chair_seat_height:.1f} cm
    Monitor distance          | {monitor_distance_optimal:.1f} cm (arm's length)
    Monitor top height        | {monitor_top_height:.1f} cm (at/below eye level)
    Monitor tilt              | 10-20° downward
    Keyboard height           | {keyboard_height:.1f} cm (elbow height)
    Keyboard from edge        | 5 cm
    Mouse height              | {keyboard_height:.1f} cm (same as keyboard)
    Elbow angle               | 90-110°
    Knee angle                | 90°
    Viewing angle             | 10-20° downward
    Ambient lighting          | 500 lux
    """)

    print("=" * 70)
    print("💡 TIP: Print this and use a tape measure to set up your desk!")
    print("=" * 70)

    return {
        "sitting_desk_height": sitting_desk_height,
        "standing_desk_height": standing_desk_height,
        "chair_height": chair_seat_height,
        "monitor_distance": monitor_distance_optimal,
        "monitor_top_height": monitor_top_height,
        "keyboard_height": keyboard_height,
    }


def main():
    """Interactive mode"""
    print("\n🔧 Starting interactive calculator...\n")

    # Get user input
    height = float(input("Enter your standing height (cm) [default: 183]: ") or "183")

    arm_input = input("Enter your arm length shoulder-to-fingertip (cm) [press Enter to estimate]: ").strip()
    arm_length = float(arm_input) if arm_input else None

    eye_input = input("Enter your sitting eye height from floor (cm) [press Enter to estimate]: ").strip()
    sitting_eye = float(eye_input) if eye_input else None

    # Calculate and display
    results = calculate_ergonomic_setup(height, arm_length, sitting_eye)

    print("\n✅ Setup complete! Measurements above are personalized for you.\n")


if __name__ == "__main__":
    # Run with your measurements directly
    print("\n🎯 Calculating for your height: 183 cm\n")
    calculate_ergonomic_setup(
        standing_height_cm=183,
        arm_length_cm=None,  # Will estimate
        sitting_eye_height_cm=None  # Will estimate
    )

    print("\n" + "=" * 70)
    print("🔄 Want to customize with more precise measurements?")
    print("=" * 70)
    print("\nRun this script to enter custom measurements:")
    print("   python3 ergonomic-calculator.py")
    print("\nOptional measurements to improve accuracy:")
    print("   • Arm length (shoulder to fingertip)")
    print("   • Sitting eye height from floor")
    print("   • Sitting elbow height from floor")
    print("=" * 70)
