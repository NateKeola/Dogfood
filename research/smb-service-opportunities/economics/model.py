"""Reproduce public scenario outputs using only the Python standard library."""
from pathlib import Path
import csv
import json
import math

ROOT = Path(__file__).resolve().parent


def calculate(a):
    rate = a["payment_processing_rate"] + a["billing_extra_rate_assumption"]
    fixed = a["payment_processing_fixed"]
    labor = a["labor_hourly_cost"]
    assert 0 <= rate < 1 and labor >= 0 and fixed >= 0
    target = a["target_economic_contribution_margin"]
    assert 0 <= target < 1 - rate
    setup_net = a["setup_price"] * (1 - a["payment_processing_rate"]) - fixed
    implementation = a["setup_labor_hours"] * labor + a["setup_other_cost"]
    unrecovered = max(0, a["acquisition_cost_per_new_account"] + implementation - setup_net)
    rows, floors = [], []
    for s in a["scenarios"]:
        churn = s["monthly_churn"]
        assert 0 < churn <= 1
        support = s["support_minutes"] / 60 * labor
        flat = fixed + support + s["infrastructure_monthly"] + s["shared_overhead_monthly"]
        replacement = churn * unrecovered
        floors.append({
            "scenario": s["name"],
            "monthly_break_even_price": (flat + replacement) / (1 - rate),
            "price_for_target_margin": (flat + replacement) / (1 - rate - target),
            "unrecovered_acquisition_and_setup": unrecovered,
            "monthly_replacement_allowance": replacement,
        })
        for price in a["prices"]:
            recurring = price * (1 - rate) - flat
            economic = recurring - replacement
            rows.append({
                "scenario": s["name"], "price": price,
                "payment_and_billing_cost": price * rate + fixed,
                "support_cost": support,
                "infrastructure": s["infrastructure_monthly"],
                "shared_overhead": s["shared_overhead_monthly"],
                "recurring_contribution_before_replacement": recurring,
                "replacement_allowance": replacement,
                "economic_contribution": economic,
                "economic_contribution_margin_pct": economic / price * 100,
                "simple_payback_months_before_churn": unrecovered / recurring if recurring > 0 else None,
                "simple_lifetime_contribution": recurring / churn - unrecovered,
            })
    addons = []
    for s in a["addons"]:
        contribution = s["price"] * (1 - rate) - s["incremental_infrastructure"] - s["incremental_support_minutes"] / 60 * labor
        addons.append({
            "addon": s["name"], "price": s["price"],
            "support_minutes": s["incremental_support_minutes"],
            "incremental_contribution": contribution,
            "incremental_margin_pct": 100 * contribution / s["price"],
            "break_even_support_minutes": (s["price"] * (1 - rate) - s["incremental_infrastructure"]) / labor * 60,
            "contribution_if_support_takes_60_minutes": s["price"] * (1 - rate) - s["incremental_infrastructure"] - labor,
        })
    return rows, floors, addons


def write_csv(name, rows):
    with (ROOT / name).open("w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=rows[0].keys(), lineterminator="\n")
        writer.writeheader()
        writer.writerows({k: round(v, 4) if isinstance(v, float) else v for k, v in row.items()} for row in rows)


def verify(a, rows, floors, addons):
    # Independent accounting identity and meaningful scenario checks.
    for row in rows:
        assert math.isclose(row["price"] - row["payment_and_billing_cost"] - row["support_cost"] - row["infrastructure"] - row["shared_overhead"] - row["replacement_allowance"], row["economic_contribution"], abs_tol=1e-9)
    base = {r["price"]: r for r in rows if r["scenario"] == "batched_base"}
    stress = {r["price"]: r for r in rows if r["scenario"] == "support_stress"}
    assert base[10]["economic_contribution"] < 0 < base[149]["economic_contribution"]
    assert stress[40]["economic_contribution"] < base[40]["economic_contribution"]
    assert all(r["contribution_if_support_takes_60_minutes"] < 0 for r in addons)
    for floor, s in zip(floors, a["scenarios"]):
        p = floor["price_for_target_margin"]
        expenses = p * (a["payment_processing_rate"] + a["billing_extra_rate_assumption"]) + a["payment_processing_fixed"] + s["support_minutes"] / 60 * a["labor_hourly_cost"] + s["infrastructure_monthly"] + s["shared_overhead_monthly"] + floor["monthly_replacement_allowance"]
        assert math.isclose((p - expenses) / p, a["target_economic_contribution_margin"], abs_tol=1e-9)


if __name__ == "__main__":
    assumptions = json.loads((ROOT / "assumptions.json").read_text())
    rows, floors, addons = calculate(assumptions)
    verify(assumptions, rows, floors, addons)
    write_csv("scenarios.csv", rows)
    write_csv("price-floors.csv", floors)
    write_csv("addons.csv", addons)
    print(json.dumps({"scenarios": len(rows), "floors": floors, "addons": addons}, indent=2))
